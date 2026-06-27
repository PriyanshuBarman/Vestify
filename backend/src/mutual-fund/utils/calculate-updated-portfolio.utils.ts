import type { MfPortfolio } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

type PrevInvestment = {
  invested: Decimal;
  units: Decimal;
  current: Decimal;
};

export const calcPortfolioAfterInvestment = (
  prevInv: PrevInvestment,
  invested: number,
  purchaseUnits: number,
) => {
  const newInvested = prevInv.invested.toNumber() + invested;
  const newUnits = prevInv.units.toNumber() + purchaseUnits;
  const newCurrent = prevInv.current.toNumber() + invested;
  const newPnl = newCurrent - newInvested;
  const newReturnPercent = newInvested > 0 ? (newPnl / newInvested) * 100 : 0;

  return {
    invested: newInvested,
    units: newUnits,
    current: newCurrent,
    pnl: newPnl,
    returnPercent: newReturnPercent,
  };
};

export const calcPortfolioAfterRedemption = (
  fund: MfPortfolio,
  costBasis: number,
  redemptionAmt: number,
  redemptionUnits: number,
) => {
  const newInvested = fund.invested.toNumber() - costBasis;
  const newCurrent = fund.current.toNumber() - redemptionAmt;
  const newUnits = fund.units.toNumber() - redemptionUnits;
  const newPnl = newCurrent - newInvested;
  const newReturnPercent = newInvested > 0 ? (newPnl / newInvested) * 100 : 0;

  return {
    invested: newInvested,
    current: newCurrent,
    units: newUnits,
    pnl: newPnl,
    returnPercent: newReturnPercent,
  };
};
