import { db } from "../../config/db.config.js";
import { fifoRedemption } from "../../src/mutualfund/services/fifo.service.js";
import {
  calcPortfolioAfterInvestment,
  calcPortfolioAfterRedemption,
} from "../../src/mutualfund/utils/calculateUpdatedPortfolio.utils.js";
import { fetchNavByDate } from "../external/fetchNavByDate.js";

export const processInvestmentOrder = async (orderData) => {
  let {
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
  amount = amount.toNumber();

  const nav = await fetchNavByDate(schemeCode, navDate);
  const units = amount / nav;

  await db.$transaction(async (tx) => {
    const prevInv = await tx.mfPortfolio.findUnique({
      where: {
        userId_schemeCode: { userId, schemeCode },
      },
    });

    let folio = prevInv?.folio;

    // 1. Create new portfolio if first investment
    if (!prevInv) {
      const newPortfolio = await tx.mfPortfolio.create({
        data: {
          userId,
          schemeCode,
          fundName,
          fundShortName,
          fundType,
          units,
          current: amount,
          invested: amount,
          fundHouseDomain,
        },
      });

      folio = newPortfolio.folio;
    } else {
      // 2. Update portfolio if subsequent investment
      const updatedValues = calcPortfolioAfterInvestment(
        prevInv,
        amount,
        units
      );
      await tx.mfPortfolio.update({
        where: { folio },
        data: updatedValues,
      });
    }

    // 3. Create holding
    await tx.mfHolding.create({
      data: {
        nav,
        units,
        userId,
        amount,
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
      await tx.mfSip.update({
        where: { id: sipId },
        data: {
          folio,
        },
      });
    }
  });
};

// ----------------------------------------------------------------------
//  Process Redemption Order
// ----------------------------------------------------------------------

export const processRedemptionOrder = async (orderData) => {
  let { id: orderId, userId, schemeCode, amount, units, navDate } = orderData;
  amount = amount.toNumber();

  //Fetch fund portfolio
  const fund = await db.mfPortfolio.findUnique({
    where: { userId_schemeCode: { userId, schemeCode } },
  });

  // Validate and mark order FAILED if invalid
  const isValid = await validateAndFailOrder(orderId, fund, amount);
  if (!isValid) return; // return if invalid

  // Fetch NAV after passing validation
  const nav = await fetchNavByDate(schemeCode, navDate);

  const isFullRedemption = !!units || amount === fund.current.toNumber();

  // Calculate final redemption values
  const finalUnits = units || amount / nav;
  const finalAmount = isFullRedemption ? fund.current.toNumber() : amount;

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
        tx
      );

      // 2. Update portfolio
      await tx.mfPortfolio.update({
        where: { folio: fund.folio },
        data: calcPortfolioAfterRedemption(fund, costBasis, finalAmount, finalUnits),
      });

      // 3. Credit Balance
      const user = await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } },
      });

      // 4. Log transaction
      await tx.transaction.create({
        data: {
          userId,
          amount,
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

export const validateAndFailOrder = async (orderId, fund, amount) => {
  let failureReason;
  if (!fund) {
    failureReason = "Fund not available in portfolio";
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
