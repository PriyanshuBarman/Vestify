import { addMinutes, format, setHours, setMinutes, setSeconds } from "date-fns";

import { timeUnits } from "../constants/chart";

/**
  Returns Chart Data for the selected range
 */
export function getSelectedRangeData(fullChartData, selectedRange) {
  if (!fullChartData.length) return;
  if (selectedRange === "All") return fullChartData;

  const startDate = getStartDate(selectedRange);

  return fullChartData.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= startDate;
  });
}

export function isValidRange(selectedRange, fullChartData) {
  if (!fullChartData.length) return;
  if (selectedRange === "All") return false;

  const startDate = getStartDate(selectedRange);

  const oldestDate = new Date(fullChartData[0].date);
  return startDate < oldestDate;
}

function getStartDate(selectedRange) {
  const { days = 0, months = 0, years = 0 } = timeUnits[selectedRange] || {};
  const now = new Date();

  let startDate = new Date(now);
  if (days) startDate.setDate(now.getDate() - days);
  if (months) startDate.setMonth(now.getMonth() - months);
  if (years) startDate.setFullYear(now.getFullYear() - years);

  return startDate;
}

/**
 * Calculates return value and percentage for a selected range
 */
export function calculateReturnMetrics(chartData, currentPrice, selectedRange) {
  // For 1D, return null to use live data
  if (selectedRange === "1D" || !chartData?.length) {
    return {
      returnValue: null,
      returnPercentage: null,
    };
  }

  const startingPrice = chartData[0]?.close;
  if (!startingPrice || !currentPrice) {
    return {
      returnValue: null,
      returnPercentage: null,
    };
  }

  const returnValue = currentPrice - startingPrice;
  const returnPercentage = (returnValue / startingPrice) * 100;

  return {
    returnValue,
    returnPercentage,
  };
}

export function getChartColor(selectedRange, live, returnMetrics) {
  if (selectedRange === "1D") {
    return live?.change >= 0 ? "var(--positive)" : "var(--negative)";
  }

  return returnMetrics?.returnValue >= 0
    ? "var(--positive)"
    : "var(--negative)";
}

// =============== For Intraday Charts ===============

/**
 * Merges intraday data with full market day time slots (9:15 AM to 3:15 PM)
 * @param {Array} intradayData - Array of actual intraday data points
 * @param {Date} date - The date for the market day (defaults to today)
 * @returns {Array} Complete day data with null values for future/missing data
 */
export function mergeIntradayDataWithMarketDay(
  intradayData,
  date = new Date(),
) {
  // Create market open close date objects
  const marketStart = setSeconds(setMinutes(setHours(date, 9), 15), 0); // 9:15 AM
  const marketEnd = setSeconds(setMinutes(setHours(date, 15), 15), 0); // 3:15 PM

  // Create full day time slots with null values
  const fullDayData = [];
  let currentTime = marketStart;

  while (currentTime <= marketEnd) {
    fullDayData.push({
      date: format(currentTime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
      close: null,
    });
    currentTime = addMinutes(currentTime, 1);
  }

  // Map actual data to corresponding time slots
  if (intradayData && Array.isArray(intradayData)) {
    intradayData.forEach((item) => {
      if (
        item &&
        item.date &&
        item.close !== undefined &&
        item.close !== null
      ) {
        const itemTime = new Date(item.date);
        const minuteKey = format(itemTime, "HH:mm");

        // Find corresponding slot and update it
        const slotIndex = fullDayData.findIndex((slot) => {
          const slotTime = new Date(slot.date);
          return format(slotTime, "HH:mm") === minuteKey;
        });

        if (slotIndex !== -1) {
          fullDayData[slotIndex].close = item.close;
        }
      }
    });
  }

  return fullDayData;
}
