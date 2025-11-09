/**
 * Calculates the updated portfolio values after making a new investment.
 *
 * @param {Object} prevInv - The previous investment object containing invested amount, units, and current value.
 * @param {number} invested - The amount newly invested.
 * @param {number} purchaseUnits - The number of units purchased in the new investment.
 * @returns {Object} An object containing updated invested amount, units, current value, profit/loss, and return percentage.
 */
export const calcPortfolioAfterInvestment = (
  prevInv,
  invested,
  purchaseUnits
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

/**
 * Calculates the updated portfolio values after redeeming (withdrawing) from the investment.
 *
 * @param {Object} fund - The current fund object containing invested amount, units, and current value.
 * @param {number} costBasis - The cost basis of the redeemed units.
 * @param {number} redemptionAmt - The amount redeemed.
 * @param {number} redemptionUnits - The number of units redeemed.
 * @returns {Object} An object containing updated invested amount, current value, units, profit/loss, and return percentage.
 */
export const calcPortfolioAfterRedemption = (
  fund,
  costBasis,
  redemptionAmt,
  redemptionUnits
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
