import {
  getNextMfBusinessDate,
  getPrevMfBusinessDate,
  isMfBusinessDay,
} from "@/shared/utils/holidays.utils.js";

export function getApplicableDates(installmentDate: Date, fundName: string) {
  const fundNameLowercase = fundName.toLowerCase();
  const isLiquidOrOvernight =
    fundNameLowercase.includes("liquid") ||
    fundNameLowercase.includes("overnight");

  const nextBday = getNextMfBusinessDate();
  const nextBdayPlus1 = getNextMfBusinessDate(1);
  const prevBday = getPrevMfBusinessDate();

  if (!isMfBusinessDay(installmentDate)) {
    return { navDate: nextBday, processDate: nextBdayPlus1 };
  }

  // all sip installments process happens before cutoff
  return isLiquidOrOvernight
    ? { navDate: prevBday, processDate: nextBday }
    : { navDate: installmentDate, processDate: nextBday };
}
