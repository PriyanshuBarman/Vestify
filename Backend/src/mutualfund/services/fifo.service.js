export const fifoRedemption = async (
  userId,
  schemeCode,
  redemptionUnits,
  tx
) => {
  const holdings = await tx.mfHolding.findMany({
    where: { userId, schemeCode },
  });

  let remainingUnits = redemptionUnits;
  let costBasis = 0;

  for (const holding of holdings) {
    if (remainingUnits === 0) break;

    const holdingUnits = holding.units.toNumber();
    const holdingNav = holding.nav.toNumber();

    if (remainingUnits >= holdingUnits) {
      costBasis += holding.amount.toNumber();
      remainingUnits -= holdingUnits;

      await tx.mfHolding.delete({ where: { id: holding.id } });
    } else {
      await tx.mfHolding.update({
        where: { id: holding.id },
        data: {
          units: holding.units.toNumber() - remainingUnits,
          amount: holding.amount.toNumber() - remainingUnits * holdingNav,
        },
      });

      // Add the amount to cost basis
      costBasis += remainingUnits * holdingNav;
      remainingUnits = 0;
    }
  }

  return Math.round(costBasis);
};
