import { TZDate } from "@date-fns/tz";

import { getNextMfBusinessDate, isMfBusinessDay } from "@/utils/holidays";

export function getNavAndProcessDateForRedemption() {
  const today = TZDate.tz("Asia/Kolkata");
  const orderMinutes = today.getHours() * 60 + today.getMinutes();
  const cutoffMinutes = 15 * 60; // 3:00 PM cutoff for redemptions

  // If today is not a business day, treat as next business day
  if (!isMfBusinessDay(today)) {
    return {
      navDate: getNextMfBusinessDate(), // T day is next business day
      processDate: getNextMfBusinessDate(1), // T+1 business day
    };
  }

  // Before cutoff
  if (orderMinutes < cutoffMinutes) {
    return {
      navDate: today, // Same day NAV
      processDate: getNextMfBusinessDate(), // Next business day
    };
  }
  // After cutoff
  return {
    navDate: getNextMfBusinessDate(), // Next business day NAV
    processDate: getNextMfBusinessDate(1), // T+1 business day
  };
}
