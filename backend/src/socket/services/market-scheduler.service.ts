import type { Server } from "socket.io";
import cron from "node-cron";
import { isMarketHolidayToday, isMarketOpen } from "../utils/cron.utils.js";
import { startPollingIfNeeded, stopPolling } from "./polling.service.js";
import { TIMEZONE } from "../utils/constants.js";

export function initializeMarketScheduler(io: Server): void {
  const todayIsHoliday = isMarketHolidayToday();

  // 9:15 AM - Market Open
  cron.schedule(
    "15 9 * * 1-5",
    () => {
      console.log("⏰ [9:15 AM] Market opening...");
      if (todayIsHoliday) return;
      if (isMarketOpen()) {
        startPollingIfNeeded(io);
        io.emit("market-status-update", true);
      }
    },
    { timezone: TIMEZONE },
  );

  // 3:30 PM - Market Close
  cron.schedule(
    "30 15 * * 1-5",
    () => {
      console.log("⏰ [3:30 PM] Market closing...");
      if (todayIsHoliday) return;
      console.log("🔴 MARKET CLOSED!");

      stopPolling();
      io.emit("market-status-update", false);
    },
    { timezone: TIMEZONE },
  );
}
