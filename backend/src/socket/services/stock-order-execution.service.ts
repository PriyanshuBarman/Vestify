import { db } from "@/config/db.config.js";
import { evaluateOrderCondition } from "@/shared/utils/evaluate-stock-order.utils.js";
import {
  cleanSymbol,
  ensureNseSymbols,
} from "@/shared/utils/normalize-stock-symbol.js";
import { liveStockFields } from "@/shared/constants/live-stock-fields.js";
import { getIO } from "@/socket/socket.js";
import { isMarketOpen } from "@/socket/utils/cron.utils.js";
import type { StockOrder } from "@prisma/client";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();
let executionInterval: ReturnType<typeof setInterval> | null = null;

export const openOrdersQueue = new Map<string, StockOrder>();

/**
 * Starts the order execution to poll live prices every 3 seconds.
 * Auto-sleeps if market is closed or if no open orders exist in queue.
 */
export async function startOrderExecutionIfNeeded() {
  if (!isMarketOpen() || executionInterval) return;

  const openOrders = await db.stockOrder.findMany({
    where: { status: "OPEN" },
  });

  openOrders.forEach((order) => openOrdersQueue.set(order.id, order));

  if (openOrdersQueue.size === 0) {
    return;
  }

  // Poll market prices and process open orders every 3 seconds
  executionInterval = setInterval(async () => {
    try {
      await processOpenOrders();
    } catch (error) {
      console.error("Order Execution Error:", error);
    }
  }, 3000);
}

/**
 * Stops the background order execution.
 */
export function stopOrderExecution() {
  if (!executionInterval) return;

  clearInterval(executionInterval);
  executionInterval = null;
  openOrdersQueue.clear();
}

/**
 * Checks all open orders against current market prices and executes matched orders.
 */
const processOpenOrders = async () => {
  if (openOrdersQueue.size === 0) {
    stopOrderExecution();
    return;
  }

  const openOrders = Array.from(openOrdersQueue.values());

  // 1. Fetch live prices for unique symbols in queue
  const uniqueSymbols = [...new Set(openOrders.map((o) => o.symbol))];
  const formattedSymbols = ensureNseSymbols(uniqueSymbols);

  const quoteData = await yahooFinance.quote(formattedSymbols, {
    fields: [...liveStockFields],
  });

  const priceMap = new Map<string, number>();
  quoteData.forEach((item) => {
    const cleaned = cleanSymbol(item.symbol as string);
    if (item.regularMarketPrice) {
      priceMap.set(cleaned, item.regularMarketPrice);
    }
  });

  // 2. Evaluate open orders against live price
  for (const order of openOrders) {
    const currentPrice = priceMap.get(order.symbol);
    if (!currentPrice) continue;

    const shouldExecute = evaluateOrderCondition(order, currentPrice);

    if (shouldExecute) {
      await executeOrder(order, currentPrice);
    }
  }
};

/**
 * Performs database transaction to fulfill order when triggered.
 */
const executeOrder = async (order: StockOrder, executionPrice: number) => {
  try {
    await db.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({
        where: { id: order.userId },
      });
      const amount = (order.quantity || 0) * executionPrice;

      if (order.action === "BUY") {
        if (user.balance.toNumber() < amount) {
          await tx.stockOrder.update({
            where: { id: order.id },
            data: {
              status: "UNSUCCESSFUL",
              failureReason: "Insufficient wallet balance at execution time.",
            },
          });
          openOrdersQueue.delete(order.id);
          return;
        }

        // Deduct balance
        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: { balance: { decrement: amount } },
        });

        // Create/Update portfolio
        const portfolio = await tx.stockPortfolio.upsert({
          where: { userId_symbol: { userId: user.id, symbol: order.symbol } },
          update: {
            quantity: { increment: order.quantity || 0 },
            invested: { increment: amount },
          },
          create: {
            userId: user.id,
            symbol: order.symbol,
            name: order.name,
            shortName: order.shortName,
            quantity: order.quantity || 0,
            invested: amount,
          },
        });

        // Add holding record
        await tx.stockHolding.create({
          data: {
            userId: user.id,
            portfolioId: portfolio.id,
            symbol: order.symbol,
            price: executionPrice,
            quantity: order.quantity || 0,
            amount: amount,
          },
        });

        // Record transaction
        await tx.transaction.create({
          data: {
            userId: user.id,
            amount: amount,
            assetCategory: "STOCK",
            stockOrderId: order.id,
            type: "DEBIT",
            updatedBalance: updatedUser.balance,
          },
        });
      } else if (order.action === "SELL") {
        const portfolio = await tx.stockPortfolio.findUnique({
          where: { userId_symbol: { userId: user.id, symbol: order.symbol } },
        });

        if (!portfolio || portfolio.quantity < (order.quantity || 0)) {
          await tx.stockOrder.update({
            where: { id: order.id },
            data: {
              status: "UNSUCCESSFUL",
              failureReason:
                "Insufficient stocks in portfolio at execution time.",
            },
          });
          openOrdersQueue.delete(order.id);
          return;
        }

        // Add balance
        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: { balance: { increment: amount } },
        });

        const isFullSell = order.quantity === portfolio.quantity;

        if (isFullSell) {
          await tx.stockPortfolio.delete({
            where: { id: portfolio.id },
          });
        } else {
          // Partial sell: decrement quantity and invested amount
          await tx.stockPortfolio.update({
            where: { id: portfolio.id },
            data: {
              quantity: { decrement: order.quantity || 0 },
              invested: {
                decrement:
                  (portfolio.invested.toNumber() / portfolio.quantity) *
                  (order.quantity || 0),
              },
            },
          });
        }

        // Record transaction
        await tx.transaction.create({
          data: {
            userId: user.id,
            amount: amount,
            assetCategory: "STOCK",
            stockOrderId: order.id,
            type: "CREDIT",
            updatedBalance: updatedUser.balance,
          },
        });
      }

      // Mark order SUCCESSFUL in DB
      await tx.stockOrder.update({
        where: { id: order.id },
        data: {
          status: "SUCCESSFUL",
          price: executionPrice,
          executedAt: new Date(),
        },
      });

      // Remove from queue
      openOrdersQueue.delete(order.id);
    });

    // Send socket alert to user
    const io = getIO();
    if (io) {
      io.emit("order:executed", {
        orderId: order.id,
        userId: order.userId,
        symbol: order.symbol,
        action: order.action,
        status: "SUCCESSFUL",
        price: executionPrice,
      });
    }
  } catch (error) {
    console.error(`Error executing order ID ${order.id}:`, error);
  }
};
