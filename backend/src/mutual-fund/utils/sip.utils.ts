import { formatDate } from "date-fns";

export function getSipEditResponse(applyDate: Date, nextInstallmentDate: Date) {
  return {
    message: `Request will be processed by ${formatDate(
      applyDate,
      "do MMM yyyy",
    )}`,
    notice: `Your next SIP installment on ${formatDate(
      nextInstallmentDate,
      "do MMM yyyy",
    )} will remain unchanged as it is within the next 2 days. The updated amount and date will apply from the following installment.`,
  };
}
