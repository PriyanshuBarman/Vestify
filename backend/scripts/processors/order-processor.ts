import { db } from "@/config/db.config.js";
import type { MfOrder, MfPortfolio } from "@prisma/client";
import {
  calcPortfolioAfterInvestment,
  calcPortfolioAfterRedemption,
} from "@/mutual-fund/utils/calculate-updated-portfolio.utils.js";
import { fifoRedemption } from "@/mutual-fund/services/fifo.service.js";
import { fetchNavInfoByDate } from "../external/fetch-nav-by-date.js";

export const processInvestmentOrder = async (orderData: MfOrder) => {
  const {
    id: orderId,
    userId,
    sipId,
    schemeCode,
    fundName,
    amount,
    navDate,
    fundType,
    fundHouseDomain,
    fundShortName,
  } = orderData;
  const amountNum = amount?.toNumber() ?? 0;

  const navInfo = await fetchNavInfoByDate(schemeCode, navDate);
  const nav = parseFloat(navInfo.nav);
  const units = amountNum / nav;

  await db.$transaction(async (tx) => {
    const prevInv = await tx.mfPortfolio.findUnique({
      where: {
        userId_schemeCode: { userId, schemeCode },
      },
    });

    let folio: number;

    // 1. Create or Update Portfolio
    if (prevInv?.folio) {
      folio = prevInv.folio;
      await tx.mfPortfolio.update({
        where: { folio },
        data: calcPortfolioAfterInvestment(prevInv, amountNum, units),
      });
    } else {
      const newPortfolio = await tx.mfPortfolio.create({
        data: {
          userId,
          schemeCode,
          fundName,
          fundShortName,
          fundType,
          units,
          current: amountNum,
          invested: amountNum,
          fundHouseDomain,
          nav: navInfo,
        },
      });
      folio = newPortfolio.folio;
    }

    // 3. Create holding
    await tx.mfHolding.create({
      data: {
        nav,
        units,
        userId,
        amount: amountNum,
        schemeCode,
        folio,
      },
    });

    // 4. Mark the order as completed with units and NAV
    await tx.mfOrder.update({
      where: { id: orderId },
      data: {
        status: "COMPLETED",
        nav,
        units,
      },
    });

    // 5. Link SIP to portfolio if not already linked
    if (sipId) {
      const sipExists = await tx.mfSip.findUnique({
        where: { id: sipId },
      });

      if (sipExists) {
        await tx.mfSip.update({ where: { id: sipId }, data: { folio } });
        return;
      }
      console.warn(
        `⚠️ SIP ID not found for order. Order will complete but SIP won't be linked to portfolio.\nSIP ID: ${sipId}\nOrder ID: ${orderId}`,
      );
    }
  });
};

// ----------------------------------------------------------------------
//  Process Redemption Order
// ----------------------------------------------------------------------

export const processRedemptionOrder = async (orderData: MfOrder) => {
  const { id: orderId, userId, schemeCode, amount, units, navDate } = orderData;
  const amountNum = amount?.toNumber() ?? 0;
  const unitsNum = units?.toNumber() ?? 0;

  //Fetch fund portfolio
  const fund = await db.mfPortfolio.findUnique({
    where: { userId_schemeCode: { userId, schemeCode } },
  });

  const isFullRedemption = Boolean(
    unitsNum || amountNum === fund?.current?.toNumber(),
  );

  // Validate and mark order FAILED if invalid
  const isValid = await validateAndFailOrder(
    orderId,
    fund,
    amountNum,
    isFullRedemption,
  );
  if (!isValid || !fund) return; // Return if invalid or fund not found to narrow 'fund' type

  // Fetch NAV after passing validation
  const navInfo = await fetchNavInfoByDate(schemeCode, navDate);
  const nav = parseFloat(navInfo.nav);

  // Calculate final redemption values
  const finalUnits = unitsNum || amountNum / nav;
  const finalAmount = isFullRedemption ? fund.current.toNumber() : amountNum;

  await db.$transaction(async (tx) => {
    if (isFullRedemption) {
      // 1. Delete portfolio
      await tx.mfPortfolio.delete({ where: { folio: fund.folio } });

      // 2. Credit Balance
      const user = await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: finalAmount } },
      });

      // 3. Log transaction
      await tx.transaction.create({
        data: {
          userId,
          amount: finalAmount,
          assetCategory: "MUTUAL_FUND",
          assetOrderId: orderId,
          type: "CREDIT",
          updatedBalance: user.balance,
        },
      });
    } else {
      // 1. Calculate cost basis
      const costBasis = await fifoRedemption(
        userId,
        schemeCode,
        finalUnits,
        tx,
      );

      // 2. Update portfolio
      await tx.mfPortfolio.update({
        where: { folio: fund.folio },
        data: calcPortfolioAfterRedemption(
          fund,
          costBasis,
          finalAmount,
          finalUnits,
        ),
      });

      // 3. Credit Balance
      const user = await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: amountNum } },
      });

      // 4. Log transaction
      await tx.transaction.create({
        data: {
          userId,
          amount: amountNum,
          assetCategory: "MUTUAL_FUND",
          assetOrderId: orderId,
          type: "CREDIT",
          updatedBalance: user.balance,
        },
      });
    }

    // Mark order as completed with final values
    await tx.mfOrder.update({
      where: { id: orderId },
      data: {
        status: "COMPLETED",
        nav,
        units: finalUnits,
        amount: finalAmount,
      },
    });
  });
};

export const validateAndFailOrder = async (
  orderId: string,
  fund: MfPortfolio | null,
  amount: number,
  isFullRedemption: boolean,
) => {
  let failureReason;
  if (!fund) {
    failureReason = "Fund not available in portfolio";
  } else if (isFullRedemption) {
    // Skip amount validation for full redemption orders
    return true;
  } else if (amount > fund.current.toNumber()) {
    failureReason = "Insufficient fund balance";
  }

  if (!failureReason) return true;

  // Else mark order as failed and return false
  await db.mfOrder.update({
    where: { id: orderId },
    data: {
      status: "FAILED",
      failureReason,
    },
  });

  return false;
};
