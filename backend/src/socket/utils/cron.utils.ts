import { isStockHolidayToday } from "@/shared/utils/holidays.utils.js";
import { TZDate } from "@date-fns/tz";
import {
  isWeekend,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from "date-fns";
import { TIMEZONE } from "../../shared/constants/live-stock-fields.js";

export function isMarketOpen() {
  const istNow = TZDate.tz(TIMEZONE);
  if (isWeekend(istNow) || Boolean(isStockHolidayToday())) return false;

  // 9:15 AM
  const marketOpenTime = setMilliseconds(
    setSeconds(setMinutes(setHours(istNow, 9), 15), 0),
    0,
  );

  // 3:30 PM
  const marketCloseTime = setMilliseconds(
    setSeconds(setMinutes(setHours(istNow, 15), 30), 0),
    0,
  );

  const nowMs = istNow.getTime();
  return nowMs >= marketOpenTime.getTime() && nowMs < marketCloseTime.getTime();
}
