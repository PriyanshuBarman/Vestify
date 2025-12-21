import { addMonths, differenceInCalendarDays, setDate } from "date-fns";

export function getNextInstallmentDate(selectedDay, nextInstallmentDate) {
  const today = new Date();

  const diffDays = differenceInCalendarDays(nextInstallmentDate, today);

  // if next installment is more than 2 days away → apply from next cycle
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
