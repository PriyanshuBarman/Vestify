import type { Server } from "socket.io";
import YahooFinance from "yahoo-finance2";
import { fields } from "../utils/constants.js";
import { pickQuoteFields } from "../utils/helper.js";
import { isMarketOpen } from "../utils/cron.utils.js";
import {
  ensureNseSymbols,
  cleanSymbol,
} from "@/shared/utils/normalize-stock-symbol.js";
import type { TickerSymbol } from "@/shared/types/stock.types.js";

const yahooFinance = new YahooFinance();
export const subscribedStocks = new Set<TickerSymbol>();
let pollInterval: ReturnType<typeof setInterval> | null = null;

export function startPollingIfNeeded(io: Server): void {
  if (!isMarketOpen() || pollInterval || subscribedStocks.size === 0) {
    return;
  }

  console.log("Polling started");

  pollInterval = setInterval(async () => {
    const subscribedSymbols = Array.from(subscribedStocks);
    if (subscribedSymbols.length === 0) return;

    try {
      const symbol = ensureNseSymbols(subscribedSymbols); // .NS
      const quoteData = await yahooFinance.quote(symbol, {
        fields: [...fields],
      });
      quoteData.forEach((item) => {
        const filteredItem = pickQuoteFields(item);
        const cleanedSymbol: TickerSymbol = cleanSymbol(
          filteredItem.symbol as string,
        );
        io.to(cleanedSymbol).emit("stock-update", filteredItem);
      });
    } catch (error) {
      console.error(
        "Yahoo Finance error:",
        error instanceof Error ? error.message : error,
      );
    }
  }, 3000);
}

export function stopPolling(): void {
  if (!pollInterval) return;

  console.log("Stopping polling...");
  clearInterval(pollInterval);
  pollInterval = null;
  subscribedStocks.clear();
}
