import type { StockSipFrequency } from "@prisma/client";
import {
  addMonths,
  addWeeks,
  isBefore,
  isSameDay,
  setDate,
  setDay,
} from "date-fns";

export function getNextStockSipDate(
  frequency: StockSipFrequency,
  sipDate: number,
  referenceDate: Date = new Date(),
): Date {
  if (frequency === "MONTHLY") {
    // Attempt to set the date in the current month
    let nextDate = setDate(referenceDate, sipDate);

    // If the date has already passed in the current month, move to the next month
    if (
      isBefore(nextDate, referenceDate) ||
      isSameDay(nextDate, referenceDate)
    ) {
      nextDate = addMonths(nextDate, 1);
    }
    return nextDate;
  } else {
    // WEEKLY frequency
    // sipDate is 1 (Monday) to 5 (Friday)
    // getDay() returns 0 (Sunday) to 6 (Saturday)
    // So if sipDate is 1, we want the next Monday.

    const targetDayOfWeek = sipDate; // 1 to 5 maps directly to Monday to Friday in date-fns setDay (where 0 is Sunday, 1 is Monday)

    let nextDate = setDay(referenceDate, targetDayOfWeek, { weekStartsOn: 1 }); // set week starts on Monday

    // If the calculated day has already passed this week (or is today), move to next week
    if (
      isBefore(nextDate, referenceDate) ||
      isSameDay(nextDate, referenceDate)
    ) {
      nextDate = addWeeks(nextDate, 1);
    }

    return nextDate;
  }
}
