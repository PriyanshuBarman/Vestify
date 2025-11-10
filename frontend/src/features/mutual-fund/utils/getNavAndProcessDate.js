import { getNextBusinessDate, isBusinessDay } from "@/utils/holidays";
import { TZDate } from "@date-fns/tz";

export function getNavAndProcessDateForRedemption() {
  const today = TZDate.tz("Asia/Kolkata");
  const orderMinutes = today.getHours() * 60 + today.getMinutes();
  const cutoffMinutes = 15 * 60; // 3:00 PM cutoff for redemptions

  // If today is not a business day, treat as next business day
  if (!isBusinessDay(today)) {
    return {
      navDate: getNextBusinessDate(), // T day is next business day
      processDate: getNextBusinessDate(1), // T+1 business day
    };
  }

  // Before cutoff
  if (orderMinutes < cutoffMinutes) {
    return {
      navDate: today, // Same day NAV
      processDate: getNextBusinessDate(), // Next business day
    };
  }
  // After cutoff
  return {
    navDate: getNextBusinessDate(), // Next business day NAV
    processDate: getNextBusinessDate(1), // T+1 business day
  };
}
