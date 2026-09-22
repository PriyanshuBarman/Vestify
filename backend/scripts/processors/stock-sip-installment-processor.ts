import { db } from "@/config/db.config.js";
import { ensureNseSymbol } from "@/shared/utils/normalize-stock-symbol.js";
import { getNextStockSipDate } from "@/stock/utils/get-next-sip-date.utils.js";
import type { StockSip } from "@prisma/client";
import { placeBuyOrder } from "@/stock/services/order.service.js";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();
export async function placeStockSipInstallmentOrder(sip: StockSip) {
  let quantityToBuy = sip.quantity;

  // 1. Fetch Current Market Price
  const symbolToFetch = ensureNseSymbol(sip.symbol);
  const quote = await yahooFinance.quote(symbolToFetch);
  const cmp = quote.regularMarketPrice;

  if (!cmp) {
    throw new Error(`Could not fetch CMP for ${sip.symbol}`);
  }

  // 2. If Type is AMOUNT, calculate quantity
  if (sip.type === "AMOUNT" && sip.amount) {
    if (cmp > sip.amount.toNumber()) {
      return await handleSipFailure(
        sip,
        `SIP amount (₹${sip.amount}) is less than current market price (₹${cmp})`,
      );
    }
    quantityToBuy = Math.floor(sip.amount.toNumber() / cmp);
  }

  if (!quantityToBuy || quantityToBuy <= 0) {
    return await handleSipFailure(
      sip,
      "Calculated quantity is zero or invalid",
    );
  }

  // 3. Early balance check (optional, but good for tracking SIP failures)
  const user = await db.user.findUnique({ where: { id: sip.userId } });
  if (!user) throw new Error("User not found");

  const estimatedCost = quantityToBuy * cmp;
  if (user.balance.toNumber() < estimatedCost) {
    return await handleSipFailure(
      sip,
      `Insufficient wallet balance. Needed ~₹${estimatedCost}, but you have ₹${user.balance}`,
    );
  }

  // 4. Create the Stock Order (it will be OPEN and execute when market opens)
  await placeBuyOrder(
    sip.userId,
    {
      symbol: sip.symbol,
      name: sip.name,
      shortName: sip.shortName,
      quantity: quantityToBuy,
      type: "REGULAR",
    },
    sip.id,
  );

  // 5. Update SIP next installment date and reset failures
  const newNextInstallmentDate = getNextStockSipDate(
    sip.frequency,
    sip.sipDate,
    sip.nextInstallmentDate,
  );

  await db.stockSip.update({
    where: { id: sip.id },
    data: {
      nextInstallmentDate: newNextInstallmentDate,
      failedCount: 0, // Reset failures on success
    },
  });
}

async function handleSipFailure(sip: StockSip, reason: string) {
  console.log(`Stock SIP ${sip.id} failed: ${reason}`);
  const failedCount = sip.failedCount + 1;

  if (failedCount >= 3) {
    // Cancel the SIP if failed 3 times
    await db.stockSip.delete({ where: { id: sip.id } });
    console.log(`Stock SIP ${sip.id} cancelled due to 3 consecutive failures.`);
  } else {
    // Just increment failure count, DO NOT advance the date (so it retries, or do we advance?)
    // In Mutual Funds, if it fails, it is usually tried again or skipped to next month.
    // For Stock SIPs, we'll advance it to the next month/week to prevent infinite retry loops
    const newNextInstallmentDate = getNextStockSipDate(
      sip.frequency,
      sip.sipDate,
      sip.nextInstallmentDate,
    );

    await db.stockSip.update({
      where: { id: sip.id },
      data: {
        failedCount,
        nextInstallmentDate: newNextInstallmentDate,
      },
    });
  }
}
