import {
  getNextBusinessDate,
  getPrevBusinessDate,
  isBusinessDay,
} from "#shared/utils/holidays.utils.js";
import { TZDate } from "@date-fns/tz";

/**
 * Determine applicable NAV and process dates for mutual fund transactions.
 *
 * ## Rules Summary
 * - **Liquid / Overnight Funds**
 *   - Before 12:30 PM → NAV = Previous business day
 *   - After 12:30 PM → NAV = Same day
 * - **All Other Funds**
 *   - Before 2:00 PM → NAV = Same day
 *   - After 2:00 PM → NAV = Next business day
 * - **Redemption Orders**
 *   - Before 3:00 PM → NAV = Same day
 *   - After 3:00 PM → NAV = Next business day
 * - Orders on weekends/holidays → Treated as next business day
 * - Processing date = NAV date + 1 business day
 *
 * @param {"investment" | "redemption"} type - Transaction type.
 * @param {string} fundCategory - e.g., "Equity Fund", "Liquid Fund".
 * @returns {{ navDate: Date, processDate: Date }}
 */

export function getApplicableDates(type, fundCategory) {
  const today = TZDate.tz("Asia/Kolkata");
  const nextBday = getNextBusinessDate();
  const nextBdayPlus1 = getNextBusinessDate(1);
  const prevBday = getPrevBusinessDate();

  if (!isBusinessDay(today)) {
    return { navDate: nextBday, processDate: nextBdayPlus1 };
  }

  const isLiquid = ["Liquid Fund", "Overnight Fund"].includes(fundCategory);
  const cutoff = type === "redemption" ? 15 * 60 : isLiquid ? 12 * 60 : 14 * 60;
  const beforeCutoff = today.getHours() * 60 + today.getMinutes() < cutoff;

  // --- Investment ---
  if (type === "investment") {
    if (isLiquid) {
      if (beforeCutoff)
        return {
          navDate: prevBday,
          processDate: nextBday,
        };
      return { navDate: today, processDate: nextBday };
    }

    // other funds (non-liquid)
    return beforeCutoff
      ? { navDate: today, processDate: nextBday }
      : { navDate: nextBday, processDate: nextBdayPlus1 };
  }

  // --- Redemption ---
  return beforeCutoff
    ? { navDate: today, processDate: nextBday }
    : { navDate: nextBday, processDate: nextBdayPlus1 };
}
