import {
  getNextBusinessDate,
  getPrevBusinessDate,
  isBusinessDay,
} from "@/shared/utils/holidays.utils.js";

export function getApplicableDates(installmentDate: Date, fundName: string) {
  const fundNameLowercase = fundName.toLowerCase();
  const isLiquidOrOvernight =
    fundNameLowercase.includes("liquid") ||
    fundNameLowercase.includes("overnight");

  const nextBday = getNextBusinessDate(0, installmentDate);
  const nextBdayPlus1 = getNextBusinessDate(1, installmentDate);
  const prevBday = getPrevBusinessDate(0, installmentDate);

  if (!isBusinessDay(installmentDate)) {
    return { navDate: nextBday, processDate: nextBdayPlus1 };
  }

  // all sip installments process happens before cutoff
  return isLiquidOrOvernight
    ? { navDate: prevBday, processDate: nextBday }
    : { navDate: installmentDate, processDate: nextBday };
}
