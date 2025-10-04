import { db } from "../../../config/db.config.js";
import { sendUserEvent } from "../../shared/events/eventManager.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";
import { getMainDomain } from "../utils/getMainDomain.utils.js";
import {
  getNavAndProcessDateForInvestment,
  getNavAndProcessDateForRedemption,
} from "../utils/getNavAndProcessDate.utiils.js";
import { instantRedemption } from "./instaRedeem.service.js";

export const placeInvestmentOrder = async ({
  userId,
  amount,
  schemeCode,
  fundName,
  shortName,
  fundType,
  fundCategory,
  fundHouseDomain,
  sipId, // Optional
}) => {
  const { processDate, navDate } =
    getNavAndProcessDateForInvestment(fundCategory);

  const { order, user } = await db.$transaction(async (tx) => {
    // 1. Deduct amount from user's wallet
    const user = await tx.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: amount },
      },
    });

    // 2. Ensure user has sufficient balance
    if (user.balance < 0) {
      throw new ApiError(400, "Insufficient wallet balance");
    }

    // 3. Create/Place MF Order
    const order = await tx.mfOrder.create({
      data: {
        userId,
        amount,
        schemeCode,
        fundName,
        shortName,
        fundType: fundType.toUpperCase(),
        fundHouseDomain: getMainDomain(fundHouseDomain),
        processDate,
        navDate,
        method: sipId ? "SIP" : "REGULAR",
        orderType: sipId ? "NEW_SIP" : "ONE_TIME",
        sipId: sipId || null,
      },
    });

    // 4. Create transaction
    await tx.transaction.create({
      data: {
        userId,
        amount,
        assetCategory: "MUTUAL_FUND",
        assetOrderId: order.id,
        type: "DEBIT",
        updatedBalance: user.balance,
      },
    });

    return { order, user };
  });

  sendUserEvent(userId, { balance: user.balance });

  return order; // Return Order Details
};

export const placeRedemptionOrder = async (
  userId,
  amount,
  fundId,
  isInstant
) => {
  const fund = await db.mfPortfolio.findUnique({
    where: { id: fundId },
  });

  if (!fund) {
    throw new ApiError(404, "Fund not found in user's portfolio");
  }
  if (amount > fund.current.toNumber()) {
    throw new ApiError(400, "Insufficient fund balance");
  }

  const isFullRedemption = amount === fund.current.toNumber();

  const { processDate, navDate } = getNavAndProcessDateForRedemption();

  // is insta redemption
  if (isInstant) {
    return await instantRedemption(fund);
  }

  await db.mfOrder.create({
    data: {
      userId,
      schemeCode: fund.schemeCode,
      fundName: fund.fundName,
      shortName: fund.shortName,
      fundType: fund.fundType,
      fundCategory: fund.fundCategory,
      fundHouseDomain: fund.fundHouseDomain,
      method: "REGULAR",
      orderType: "REDEEM",
      amount: !isFullRedemption ? amount : null, // Store amount for partial-redemption
      units: isFullRedemption ? fund.units.toNumber() : null, // Store total units for full-redemption
      processDate,
      navDate,
    },
  });
};

export const getAllOrders = async (userId) => {
  const orders = await db.mfOrder.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!orders.length) {
    throw new ApiError(404, "No orders found");
  }

  return orders;
};

export const getOrderDetail = async (orderId) => {
  return await db.mfOrder.findUnique({
    where: { id: orderId },
  });
};

export const getFundOrders = async (userId, fundId) => {
  const orders = await db.mfOrder.findMany({
    where: { userId, fundId },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!orders.length) {
    throw new ApiError(404, "No orders found");
  }

  return orders;
};
