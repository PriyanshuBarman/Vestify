import { TZDate } from "@date-fns/tz";
import { isAfter, isBefore, isWeekend, setHours, setMinutes } from "date-fns";
import { TIMEZONE } from "./constants.js";
import { nseHolidays } from "@/shared/constants/holidays.constant.js";

export function isMarketHolidayToday(): boolean {
  const istNow = TZDate.tz(TIMEZONE);
  const todayString = istNow.toISOString().split("T")[0]; // YYYY-MM-DD

  return nseHolidays.some((holiday) => holiday.date === todayString);
}

export function isMarketOpen(): boolean {
  const istNow = TZDate.tz(TIMEZONE);
  if (isWeekend(istNow)) return false;

  const marketOpenTime = setMinutes(setHours(istNow, 9), 15); // 9:15 AM
  const marketCloseTime = setMinutes(setHours(istNow, 15), 30); // 3:30 PM

  return isAfter(istNow, marketOpenTime) && isBefore(istNow, marketCloseTime);
}
