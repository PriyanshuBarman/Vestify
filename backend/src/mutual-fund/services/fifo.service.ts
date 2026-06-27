import type { Prisma } from "@prisma/client";

export const fifoRedemption = async (
  userId: string,
  schemeCode: number,
  redemptionUnits: number,
  tx: Prisma.TransactionClient,
) => {
  const holdings = await tx.mfHolding.findMany({
    where: { userId, schemeCode },
    orderBy: { createdAt: "asc" },
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
