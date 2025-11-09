import { TZDate } from "@date-fns/tz";
import { addMonths } from "date-fns";

export const getNextInstallmentDate = (sipDate) => {
  const nextInstallmentDate = addMonths(TZDate.tz("Asia/Kolkata"), 1);
  nextInstallmentDate.setDate(sipDate);

  return nextInstallmentDate;
};
