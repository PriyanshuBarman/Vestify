export const normalizePortfolio = (portfolio) => {
  const normalizeFundValues = (fund) => ({
    ...fund,
    units: fund.units?.toNumber(),
    invested: fund.invested?.toNumber(),
    current: fund.current?.toNumber(),
    pnl: fund.pnl?.toNumber(),
    returnPercent: fund.returnPercent?.toNumber(),
    dayChangePercent: fund.dayChangePercent?.toNumber(),
    dayChangeValue: fund.dayChangeValue?.toNumber(),
  });

  // Handle both single object and array
  return Array.isArray(portfolio)
    ? portfolio.map(normalizeFundValues)
    : normalizeFundValues(portfolio);
};
