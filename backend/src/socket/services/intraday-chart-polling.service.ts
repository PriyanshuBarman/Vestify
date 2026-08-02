import type { Server } from "socket.io";
import { NseIndia } from "stock-nse-india";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { isMarketOpen } from "../utils/cron.utils.js";
import { cleanSymbol } from "@/shared/utils/normalize-stock-symbol.js";
import type { TickerSymbol } from "@/shared/types/stock.types.js";

const nseIndia = new NseIndia();

export const chartQueue = new Set<TickerSymbol>();
let chartPollInterval: ReturnType<typeof setInterval> | null = null;

export function startIntradayChartPollingIfNeeded(io: Server) {
  if (!isMarketOpen() || chartPollInterval || chartQueue.size === 0) {
    return;
  }

  chartPollInterval = setInterval(async () => {
    if (chartQueue.size === 0) {
      stopIntradayChartPolling();
      return;
    }

    const subscribedSymbols = Array.from(chartQueue);

    try {
      const chartDataPromises = subscribedSymbols.map(async (symbol) => {
        try {
          const cleanedSymbol = cleanSymbol(symbol);
          const rawResponse =
            await nseIndia.getEquityIntradayData(cleanedSymbol);

          const rawPoints = rawResponse?.grapthData;

          if (
            !rawPoints ||
            !Array.isArray(rawPoints) ||
            rawPoints.length === 0
          ) {
            return;
          }

          // Filter out Pre-Open ('PO') data points
          const validPoints = rawPoints.filter(
            (item) => item && Array.isArray(item) && item[2] !== "PO",
          );

          if (validPoints.length === 0) return;

          // Check if latest data point timestamp belongs to today in IST
          const latestPoint = validPoints[validPoints.length - 1];
          if (!latestPoint) return;

          const latestDateIST = getISTDateString(latestPoint[0]);
          const todayIST = getISTDateString();

          // Remove from queue if provided previous day's data (not todays data)
          if (latestDateIST !== todayIST) {
            chartQueue.delete(symbol);
            if (chartQueue.size === 0) {
              stopIntradayChartPolling();
            }
            return;
          }

          // Format chart data for today's points
          const chartData = validPoints
            .filter((item) => getISTDateString(item[0]) === todayIST)
            .map((item) => ({
              date: new Date(item[0]),
              close: item[1],
            }));

          if (chartData.length === 0) return;

          io.to(symbol).emit("chart:update", {
            symbol,
            data: chartData,
          });
        } catch (error) {
          console.error(
            `Intraday chart fetch error for ${symbol}:`,
            error instanceof Error ? error.message : error,
          );
        }
      });

      await Promise.allSettled(chartDataPromises);
    } catch (error) {
      console.error(
        "Intraday chart polling error:",
        error instanceof Error ? error.message : error,
      );
    }
  }, 5000); // Poll every 5 seconds for intraday data
}

export function stopIntradayChartPolling() {
  if (!chartPollInterval) return;

  clearInterval(chartPollInterval);
  chartPollInterval = null;
  chartQueue.clear();
}

function getISTDateString(timestamp?: number | string | Date) {
  const tzDate = timestamp
    ? new TZDate(new Date(timestamp), "Asia/Kolkata")
    : TZDate.tz("Asia/Kolkata");
  return format(tzDate, "yyyy-MM-dd");
}
