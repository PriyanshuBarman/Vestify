import { tz, TZDate } from "@date-fns/tz";
import { format, isWeekend } from "date-fns";

import { mutualFundHolidays, nseHolidays } from "@/constants/holidays";

// ==========================================
// MUTUAL FUND HOLIDAY UTILS
// ==========================================

function isMfHoliday(dateStr) {
  return mutualFundHolidays.find((h) => h.date === dateStr) || false;
}

export function isMfHolidayToday() {
  const todayStr = format(new Date(), "yyyy-MM-dd", {
    in: tz("Asia/Kolkata"),
  });
  return mutualFundHolidays.find((h) => h.date === todayStr) || false;
}

export function isMfBusinessDay(date) {
  return !isWeekend(date) && !isMfHoliday(format(date, "yyyy-MM-dd"));
}

export function getNextMfBusinessDate(offset = 0, fromDate) {
  let newDate = new Date(fromDate || TZDate.tz("Asia/Kolkata"));
  let count = 0;

  while (count <= offset) {
    newDate.setDate(newDate.getDate() + 1);
    if (isMfBusinessDay(newDate)) {
      count++;
    }
  }

  return newDate;
}

export function getPrevMfBusinessDate(offset = 0, fromDate) {
  let date = new Date(fromDate || TZDate.tz("Asia/Kolkata"));
  let moved = 0;

  while (moved <= offset) {
    date.setDate(date.getDate() - 1);
    if (isMfBusinessDay(date)) {
      moved++;
    }
  }

  return date;
}

// ==========================================
// STOCK MARKET HOLIDAY UTILS
// ==========================================

function isStockHoliday(dateStr) {
  return nseHolidays.find((h) => h.date === dateStr) || false;
}

export function isStockHolidayToday() {
  const todayStr = format(new Date(), "yyyy-MM-dd", {
    in: tz("Asia/Kolkata"),
  });
  return nseHolidays.find((h) => h.date === todayStr) || false;
}

export function isStockBusinessDay(date) {
  return !isWeekend(date) && !isStockHoliday(format(date, "yyyy-MM-dd"));
}

export function getNextStockBusinessDate(offset = 0, fromDate) {
  let newDate = new Date(fromDate || TZDate.tz("Asia/Kolkata"));
  let count = 0;

  while (count <= offset) {
    newDate.setDate(newDate.getDate() + 1);
    if (isStockBusinessDay(newDate)) {
      count++;
    }
  }

  return newDate;
}

export function getPrevStockBusinessDate(offset = 0, fromDate) {
  let date = new Date(fromDate || TZDate.tz("Asia/Kolkata"));
  let moved = 0;

  while (moved <= offset) {
    date.setDate(date.getDate() - 1);
    if (isStockBusinessDay(date)) {
      moved++;
    }
  }

  return date;
}

// Backward compatibility aliases
export const isTodayHoliday = isStockHolidayToday;
export const isBusinessDay = isMfBusinessDay;
export const getNextBusinessDate = getNextMfBusinessDate;
export const getPrevBusinessDate = getPrevMfBusinessDate;
