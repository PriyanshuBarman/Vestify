import {
  getNextBusinessDate,
  getPrevBusinessDate,
  isBusinessDay,
} from "#shared/utils/holidays.utils.js";

/**
 * @param {Date} date - Transaction date.
 * @param {string} fundCategory - e.g., "Equity Fund", "Liquid Fund".
 * @returns {{ navDate: Date, processDate: Date }}
 */

export function getApplicableDates(date, fundCategory) {
  const installmentDate = date;
  const isLiquid = ["Liquid Fund", "Overnight Fund"].includes(fundCategory);

  const nextBday = getNextBusinessDate(0, installmentDate);
  const nextBdayPlus1 = getNextBusinessDate(1, installmentDate);
  const prevBday = getPrevBusinessDate(0, installmentDate);

  if (!isBusinessDay(installmentDate)) {
    return { navDate: nextBday, processDate: nextBdayPlus1 };
  }

  // all sip installments process happens before cutoff
  return isLiquid
    ? { navDate: prevBday, processDate: nextBday }
    : { navDate: installmentDate, processDate: nextBday };
}
