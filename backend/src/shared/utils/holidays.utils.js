import { holidays } from "#shared/constants/holidays.constant.js";
import { tz, TZDate } from "@date-fns/tz";
import { format, isWeekend } from "date-fns";

/**
 * @param {string} dateStr - The date to check (YYYY-MM-DD).
 * @returns {Object|boolean} - The holiday object if found, otherwise false.
 */
function isHoliday(dateStr) {
  return holidays.find((h) => h.date === dateStr) || false;
}

export function isTodayHoliday() {
  const todayStr = format(new Date(), "yyyy-MM-dd", {
    in: tz("Asia/Kolkata"),
  });

  return holidays.find((h) => h.date === todayStr) || false;
}

export function isBusinessDay(date) {
  return !isWeekend(date) && !isHoliday(format(date, "yyyy-MM-dd"));
}

export function getNextBusinessDate(offset = 0, fromDate) {
  let newDate = new Date(fromDate || TZDate.tz("Asia/Kolkata"));
  let count = 0;

  while (count <= offset) {
    newDate.setDate(newDate.getDate() + 1);
    if (isBusinessDay(newDate)) {
      count++;
    }
  }

  return newDate;
}

export function getPrevBusinessDate(offset = 0, fromDate) {
  let date = new Date(fromDate || TZDate.tz("Asia/Kolkata"));
  let moved = 0;

  while (moved <= offset) {
    date.setDate(date.getDate() - 1);
    if (!isWeekend(date) && !isHoliday(format(date, "yyyy-MM-dd"))) {
      moved++;
    }
  }

  return date;
}
