import type { Server } from "socket.io";
import cron from "node-cron";
import { isMarketHolidayToday, isMarketOpen } from "../utils/cron.utils.js";
import {
  startStockPricePollingIfNeeded,
  stopStockPricePolling,
} from "./stock-price-polling.service.js";
import { TIMEZONE } from "../../shared/constants/live-stock-fields.js";
import {
  startOrderExecutionIfNeeded,
  stopOrderExecution,
} from "@/socket/services/stock-order-execution.service.js";
import { expireOutdatedStockOrders } from "./stock-order-expiration.service.js";
import {
  startIntradayChartPollingIfNeeded,
  stopIntradayChartPolling,
} from "./intraday-chart-polling.service.js";

export function initializeMarketScheduler(io: Server) {
  const todayIsHoliday = isMarketHolidayToday();

  // Start if server restarts during market hours
  if (!todayIsHoliday && isMarketOpen()) {
    startOrderExecutionIfNeeded();
  }

  // 9:15 AM - Market Open
  cron.schedule(
    "15 9 * * 1-5",
    () => {
      if (todayIsHoliday) return;

      io.emit("market:open");
      io.emit("market:status", true);
      startOrderExecutionIfNeeded();
      startStockPricePollingIfNeeded(io);
      startIntradayChartPollingIfNeeded(io!);
    },
    { timezone: TIMEZONE },
  );

  // 3:30 PM - Market Close
  cron.schedule(
    "30 15 * * 1-5",
    async () => {
      if (todayIsHoliday) return;

      io.emit("market:close");
      io.emit("market:status", false);
      stopOrderExecution();
      stopStockPricePolling();
      stopIntradayChartPolling();

      await expireOutdatedStockOrders();
    },
    { timezone: TIMEZONE },
  );
}
