import {
  getNextStockBusinessDate,
  isStockBusinessDay,
} from "@/shared/utils/holidays.utils.js";
import { TZDate } from "@date-fns/tz";
import type { StockOrderType } from "@prisma/client";
import { addYears, setHours, setMinutes } from "date-fns";

/**
 * Returns the exact date when an order should expire.
 * - For GTT orders, it expires 1 year from now.
 * - For REGULAR / SL orders (DAY_END validity):
 *   - If placed after market close or on a holiday, it expires on the next trading day.
 *   - If placed on a trading day before market close (3:30 PM), it expires today.
 */

export function getOrderExpiryDate(type: StockOrderType) {
  const istNow = TZDate.tz("Asia/Kolkata");
  const marketCloseTime = setMinutes(setHours(istNow, 15), 30); // 3:30 PM

  if (type === "GTT") {
    return addYears(istNow, 1);
  }

  const isBusinessDay = isStockBusinessDay(istNow);
  const isAfterMarket = istNow > marketCloseTime;

  if (isAfterMarket || !isBusinessDay) {
    const date = getNextStockBusinessDate();
    return date;
  }

  return marketCloseTime;
}
