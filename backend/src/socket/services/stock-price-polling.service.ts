import type { Server } from "socket.io";
import YahooFinance from "yahoo-finance2";
import { liveStockFields } from "@/shared/constants/live-stock-fields.js";
import { pickQuoteFields } from "../utils/helper.js";
import { isMarketOpen } from "../utils/cron.utils.js";
import {
  ensureNseSymbols,
  cleanSymbol,
} from "@/shared/utils/normalize-stock-symbol.js";
import type { TickerSymbol } from "@/shared/types/stock.types.js";

const yahooFinance = new YahooFinance();

export const stockQueue = new Set<TickerSymbol>();
let pollInterval: ReturnType<typeof setInterval> | null = null;

export function startStockPricePollingIfNeeded(io: Server) {
  if (!isMarketOpen() || pollInterval || stockQueue.size === 0) {
    return;
  }

  pollInterval = setInterval(async () => {
    const subscribedSymbols = Array.from(stockQueue);
    if (subscribedSymbols.length === 0) return;

    try {
      const symbol = ensureNseSymbols(subscribedSymbols); // .NS
      const quoteData = await yahooFinance.quote(symbol, {
        fields: [...liveStockFields],
      });
      quoteData.forEach((item) => {
        const filteredItem = pickQuoteFields(item);
        const cleanedSymbol: TickerSymbol = cleanSymbol(
          filteredItem.symbol as string,
        );
        io.to(cleanedSymbol).emit("stock:update", filteredItem);
      });
    } catch (error) {
      console.error(
        "Yahoo Finance error:",
        error instanceof Error ? error.message : error,
      );
    }
  }, 2000);
}

export function stopStockPricePolling() {
  if (!pollInterval) return;

  clearInterval(pollInterval);
  pollInterval = null;
  stockQueue.clear();
}
