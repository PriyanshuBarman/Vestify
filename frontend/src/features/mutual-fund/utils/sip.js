import { tz } from "@date-fns/tz";
import {
  addMonths,
  differenceInCalendarDays,
  formatDate,
  setDate,
} from "date-fns";

export function getNextInstallmentDateAfterEdit(
  selectedDay,
  nextInstallmentDate,
) {
  if (!nextInstallmentDate || !selectedDay) return null;

  const today = new Date();
  const diffDays = differenceInCalendarDays(nextInstallmentDate, today, {
    in: tz("Asia/Kolkata"),
  });

  // if next installment is within 2 days → apply from next cycle
  if (diffDays <= 2) {
    return setDate(addMonths(today, 1), selectedDay);
  }

  // selected day is in current month but ahead of today + 2 days -> return date
  if (selectedDay > today.getDate() + 2) {
    return setDate(today, selectedDay);
  }

  // otherwise → add one month to the date
  return setDate(addMonths(today, 1), selectedDay);
}

export function getNextInstallmentDateAfterSkip(nextInstallmentDate, diff) {
  const newNextInstallmentDate = addMonths(
    nextInstallmentDate,
    diff > 2 ? 1 : 2,
  );

  return formatDate(newNextInstallmentDate, "dd MMM yy");
}
