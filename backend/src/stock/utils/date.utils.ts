import {
  getNextStockBusinessDate,
  isStockBusinessDay,
} from "@/shared/utils/holidays.utils.js";
import { TZDate } from "@date-fns/tz";
import type { StockOrderType } from "@prisma/client";
import { addYears, startOfDay } from "date-fns";

/**
 * Returns the exact date when an order should expire.
 * - For GTT orders, it expires 1 year from now.
 * - For REGULAR / SL orders (DAY_END validity):
 *   - If placed on a trading day before market close (3:30 PM), it expires today.
 *   - If placed after market close or on a holiday, it expires on the next trading day.
 */
export function getOrderExpiryDate(type: StockOrderType): Date {
  const today = TZDate.tz("Asia/Kolkata");
  if (type === "GTT") {
    return addYears(today, 1);
  }

  // Market closes at 15:30 (3:30 PM)
  const isPastMarketClose = today.getHours() === 15 && today.getMinutes() >= 30;

  if (!isStockBusinessDay(today) || isPastMarketClose) {
    return startOfDay(getNextStockBusinessDate());
  }

  return startOfDay(today);
}
