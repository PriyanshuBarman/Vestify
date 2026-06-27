import { db } from "@/config/db.config.js";
import { sendUserEvent } from "@/shared/events/event-manager.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import type {
  InvestmentOrderSchema,
  RedemptionOrderSchema,
} from "../schemas/order.schema.js";
import { getApplicableDates } from "../utils/get-applicable-dates.utiils.js";
import { getDomain } from "../utils/get-domain.utils.js";
import { instantRedemption } from "./insta-redemption.service.js";

export const placeInvestmentOrder = async ({
  userId,
  amount,
  schemeCode,
  fundName,
  fundShortName,
  fundType,
  fundCategory,
  fundHouseDomain,
  sipId, // Optional
}: InvestmentOrderSchema & { userId: string; sipId?: string }) => {
  const { processDate, navDate } = getApplicableDates(
    "investment",
    fundCategory,
  );

  const { order, user } = await db.$transaction(async (tx) => {
    // 1. Deduct amount from user's wallet
    const user = await tx.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: amount },
      },
    });

    // 2. Ensure user has sufficient balance
    if (user.balance.toNumber() < 0) {
      throw new ApiError(400, "Insufficient wallet balance");
    }

    // 3. Create/Place MF Order
    const order = await tx.mfOrder.create({
      data: {
        userId,
        amount,
        schemeCode,
        fundName,
        fundShortName,
        fundType,
        fundHouseDomain: getDomain(fundHouseDomain)!,
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

  return order;
};

export const placeRedemptionOrder = async ({
  userId,
  amount,
  folio,
  isInstant,
}: RedemptionOrderSchema & { userId: string; folio: number }) => {
  const fund = await db.mfPortfolio.findUnique({
    where: { folio: Number(folio) },
  });

  if (!fund) {
    throw new ApiError(404, "Fund not found in user's portfolio");
  }
  if (amount > fund.current.toNumber()) {
    throw new ApiError(400, "Insufficient fund balance");
  }

  const isFullRedemption = amount === fund.current.toNumber();

  const { processDate, navDate } = getApplicableDates(
    "redemption",
    fund.fundName,
  ); //bookmark

  // is insta redemption
  if (isInstant) {
    return await instantRedemption(fund, amount);
  }

  const order = await db.mfOrder.create({
    data: {
      userId,
      schemeCode: fund.schemeCode,
      fundName: fund.fundName,
      fundShortName: fund.fundShortName,
      fundType: fund.fundType,
      fundHouseDomain: getDomain(fund.fundHouseDomain)!,
      method: "REGULAR",
      orderType: "REDEEM",
      amount,
      units: isFullRedemption ? fund.units.toNumber() : null, // Store total units for full-redemption
      processDate,
      navDate,
    },
  });

  return order;
};

export const getAllOrders = async (userId: string) => {
  const orders = await db.mfOrder.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const getPendingOrders = async (userId: string) => {
  const orders = await db.mfOrder.findMany({
    where: { userId, status: "PENDING" },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const getOrderDetail = async (orderId: string) => {
  return await db.mfOrder.findUnique({
    where: { id: orderId },
  });
};

export const getFundOrders = async (userId: string, schemeCode: number) => {
  const orders = await db.mfOrder.findMany({
    where: {
      userId,
      schemeCode,
      status: "COMPLETED",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};
