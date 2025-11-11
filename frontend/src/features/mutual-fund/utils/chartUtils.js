const monthArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]; // prettier-ignore
const timeUnits = {
  "1M": { months: 1 },
  "6M": { months: 6 },
  "1Y": { years: 1 },
  "3Y": { years: 3 },
  "5Y": { years: 5 },
};

/**
  Returns Chart Data for the selected range
 */
export function getSelectedRangeData(fullChartData, selectedRange) {
  if (!fullChartData.length) return;
  if (selectedRange === "All") return fullChartData;

  const startDate = getStartDate(selectedRange);

  return fullChartData.filter((entry) => {
    // Parse "16-Apr-2025" to Date object
    const [day, monthStr, year] = entry.date.split(" ");
    const month = monthArr.indexOf(monthStr);

    const entryDate = new Date(year, month, day);

    return entryDate >= startDate;
  });
}

export function isValidRange(selectedRange, fullChartData) {
  if (!fullChartData.length) return;
  if (selectedRange === "All") return false;

  const startDate = getStartDate(selectedRange);

  const [day, monthStr, year] = fullChartData[0].date.split(" ");

  const month = monthArr.indexOf(monthStr);

  const oldestDate = new Date(year, month, day);
  return startDate < oldestDate;
}

function getStartDate(selectedRange) {
  const { months = 0, years = 0 } = timeUnits[selectedRange] || {};
  const now = new Date();

  let startDate = new Date(now);
  if (months) startDate.setMonth(now.getMonth() - months);
  if (years) startDate.setFullYear(now.getFullYear() - years);

  return startDate;
}
