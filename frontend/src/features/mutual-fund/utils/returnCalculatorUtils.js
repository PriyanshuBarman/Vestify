export function calculateAbsoluteReturn(amount, annualizedReturn, years) {
  const annualizedReturnDecimal = annualizedReturn / 100;
  const absoluteReturnDecimal =
    Math.pow(1 + annualizedReturnDecimal, years) - 1;

  const absoluteReturnPercentage = absoluteReturnDecimal * 100;
  const finalValue = Math.round(
    amount + (amount * absoluteReturnPercentage) / 100,
  );

  return {
    totalInvestment: amount,
    finalValue,
    returnPercentage: absoluteReturnPercentage.toFixed(2),
  };
}

export function calculateSIPReturns(chartData, monthlySipAmount, years) {
  if (!chartData || chartData.length === 0) {
    return { totalInvestment: 0, finalValue: 0, returnPercentage: 0 };
  }

  const sipDates = getSIPDates(chartData, years);

  if (sipDates.length === 0) {
    return { totalInvestment: 0, finalValue: 0, returnPercentage: 0 };
  }

  let totalInvestment = 0;
  let totalUnits = 0;
  const cashFlows = [];

  // Calculate SIP investments
  sipDates.forEach((sipData) => {
    const unitsAllotted = monthlySipAmount / sipData.nav;
    totalInvestment += monthlySipAmount;
    totalUnits += unitsAllotted;

    cashFlows.push({
      date: sipData.sipDate,
      amount: monthlySipAmount,
    });
  });

  // Current value calculation
  const latestNAV = chartData[chartData.length - 1].nav;
  const currentValue = totalUnits * latestNAV;

  const absoluteReturns = currentValue - totalInvestment;

  // Calculate returns
  const returnPercentage =
    totalInvestment > 0 ? (absoluteReturns / totalInvestment) * 100 : 0;

  return {
    totalInvestment,
    finalValue: currentValue,
    returnPercentage: parseFloat(returnPercentage.toFixed(2)),
  };
}

// Get the first available date of each month from chart data
function getSIPDates(chartData, years) {
  if (!chartData || chartData.length === 0) return [];

  // Create Map for O(1) date lookups to improve performance
  const navMap = new Map();
  chartData.forEach((item) => {
    const date = parseChartDate(item.date);
    const timestamp = date.getTime();
    navMap.set(timestamp, item);
  });

  const sipDates = [];
  const latestDate = parseChartDate(chartData[chartData.length - 1].date);

  // Use 1st of every month as SIP date for consistency and transparency
  const targetDay = 1;

  // Calculate start date: go back exactly 'years' from the latest date
  const startDate = new Date(latestDate);
  startDate.setFullYear(startDate.getFullYear() - years);

  // Start from the month after the calculated start date to get exactly 12 months
  let currentSipDate = new Date(startDate);
  currentSipDate.setMonth(currentSipDate.getMonth() + 1);

  const totalMonths = years * 12;
  let monthsProcessed = 0;

  // Generate SIP investment dates for each month in the specified period
  while (monthsProcessed < totalMonths) {
    currentSipDate.setDate(targetDay);

    // Find the first available NAV date on or after the 1st (handles holidays/weekends)
    let foundNAV = null;

    // Try 1st, then next business days if 1st is unavailable
    for (let dayOffset = 0; dayOffset <= 10; dayOffset++) {
      const checkDate = new Date(currentSipDate);
      checkDate.setDate(targetDay + dayOffset);

      // Don't go beyond the current month
      if (checkDate.getMonth() !== currentSipDate.getMonth()) {
        break;
      }

      // Check if this date exists in the navMap
      const timestamp = checkDate.getTime();
      foundNAV = navMap.get(timestamp);

      if (foundNAV) break;
    }

    if (foundNAV) {
      sipDates.push({
        sipDate: new Date(currentSipDate),
        navDate: foundNAV.date,
        nav: foundNAV.nav,
      });
    }

    // Move to next month
    currentSipDate.setMonth(currentSipDate.getMonth() + 1);
    monthsProcessed++;
  }

  return sipDates;
}

// Parse date from "16 Apr 2024" format to Date object
function parseChartDate(dateString) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [day, monthStr, year] = dateString.split(" ");
  let month = monthNames.indexOf(monthStr);

  return new Date(year, month, parseInt(day));
}

export function calcFutureValues(type, amount, annualReturn, years) {
  const calculateLumpsum = () => {
    const r = annualReturn / 100; // yearly rate in decimal
    const fv = amount * Math.pow(1 + r, years);
    return fv;
  };

  const calculateSIP = () => {
    const r = annualReturn / 100 / 12;
    const n = years * 12;

    const fv = amount * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    return fv;
  };

  const invested = type === "sip" ? amount * (years * 12) : amount;
  const fv = type === "sip" ? calculateSIP() : calculateLumpsum();
  return {
    invested,
    estReturn: fv - invested,
    futureValue: fv,
  };
}
