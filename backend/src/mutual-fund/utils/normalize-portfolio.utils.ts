import type { MfPortfolio } from "@prisma/client";

const normalizeFundValues = (fund: MfPortfolio) => ({
  ...fund,
  units: fund.units?.toNumber(),
  invested: fund.invested?.toNumber(),
  current: fund.current?.toNumber(),
  pnl: fund.pnl?.toNumber(),
  returnPercent: fund.returnPercent?.toNumber(),
  dayChangePercent: fund.dayChangePercent?.toNumber(),
  dayChangeValue: fund.dayChangeValue?.toNumber(),
});

export function normalizePortfolio(portfolio: MfPortfolio | MfPortfolio[]) {
  // Handle both single object and array
  return Array.isArray(portfolio)
    ? portfolio.map(normalizeFundValues)
    : normalizeFundValues(portfolio);
}
