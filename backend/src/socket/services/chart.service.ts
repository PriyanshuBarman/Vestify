import type { Server } from "socket.io";
import { NseIndia } from "stock-nse-india";
import { isMarketOpen } from "../utils/cron.utils.js";
import type { TickerSymbol } from "@/shared/types/stock.types.js";

const nseIndia = new NseIndia();
export const chartSubscribedStocks = new Set<TickerSymbol>();
let chartPollInterval: ReturnType<typeof setInterval> | null = null;

export function startChartPollingIfNeeded(io: Server): void {
  if (
    !isMarketOpen() ||
    chartPollInterval ||
    chartSubscribedStocks.size === 0
  ) {
    return;
  }

  console.log("✅ Chart polling started");

  chartPollInterval = setInterval(async () => {
    const subscribedSymbols = Array.from(chartSubscribedStocks);
    if (subscribedSymbols.length === 0) return;

    try {
      const chartDataPromises = subscribedSymbols.map(async (symbol) => {
        try {
          const data = await nseIndia.getEquityIntradayData(symbol);
          const chartData = (data.grapthData as [number, number, string][])
            .filter((item) => item[2] !== "PO")
            .map((item) => {
              return {
                date: new Date(item[0]),
                close: item[1],
              };
            });

          io.to(symbol).emit("intraday-chart-update", {
            symbol,
            data: chartData,
          });
        } catch (error) {
          console.error(
            `Chart data error for ${symbol}:`,
            error instanceof Error ? error.message : error,
          );
        }
      });

      await Promise.allSettled(chartDataPromises);
    } catch (error) {
      console.error(
        "Chart polling error:",
        error instanceof Error ? error.message : error,
      );
    }
  }, 5000); // Poll every 5 seconds for intraday data
}

export function stopChartPolling(): void {
  if (!chartPollInterval) return;

  console.log("Stopping chart polling...");
  clearInterval(chartPollInterval);
  chartPollInterval = null;
  chartSubscribedStocks.clear();
}
