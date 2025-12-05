import { TZDate } from "@date-fns/tz";
import {
  addDays,
  isAfter,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";

const KEY = "cache-last-refresh";

export function shouldInvalidateCache() {
  const storedTime = localStorage.getItem(KEY);
  const currentTime = TZDate.tz("Asia/Kolkata");
  const currentTimeISO = currentTime.toISOString();

  if (!storedTime) {
    localStorage.setItem(KEY, currentTimeISO);
    return true;
  }

  const lastRefresh = new Date(storedTime);

  // Today's refresh cutoff: 6:30 AM IST
  const todayCutoff = setSeconds(setMinutes(setHours(currentTime, 6), 30), 0);

  // If already refreshed after today's cutoff(6:30 AM) → Skip
  if (isAfter(lastRefresh, todayCutoff)) return false;

  // If current time has passed today's 6:30 AM cutoff → Invalidate cache
  if (isAfter(currentTime, todayCutoff)) {
    localStorage.setItem(KEY, currentTimeISO);
    return true;
  }

  // Yesterday's refresh cutoff: 6:30 AM yesterday
  const yesterdayCutoff = addDays(todayCutoff, -1);

  // If last refresh happened before yesterday's cutoff → Invalidate cache
  if (isBefore(lastRefresh, yesterdayCutoff)) {
    localStorage.setItem(KEY, currentTimeISO);
    return true;
  }

  return false;
}
