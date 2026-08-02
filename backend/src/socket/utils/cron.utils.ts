import { TZDate } from "@date-fns/tz";
import { isAfter, isBefore, isWeekend, setHours, setMinutes } from "date-fns";
import { TIMEZONE } from "../../shared/constants/live-stock-fields.js";
import { isStockHolidayToday } from "@/shared/utils/holidays.utils.js";

export function isMarketHolidayToday() {
  return !!isStockHolidayToday();
}

export function isMarketOpen() {
  const istNow = TZDate.tz(TIMEZONE);
  if (isWeekend(istNow)) return false;

  const marketOpenTime = setMinutes(setHours(istNow, 9), 15); // 9:15 AM
  const marketCloseTime = setMinutes(setHours(istNow, 15), 30); // 3:30 PM

  return isAfter(istNow, marketOpenTime) && isBefore(istNow, marketCloseTime);
}
