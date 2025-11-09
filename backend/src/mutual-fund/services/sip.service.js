import { tz } from "@date-fns/tz";
import { addDays, addMonths, differenceInDays } from "date-fns";
import { db } from "../../../config/db.config.js";
import { ApiError } from "../../shared/utils/api-error.utils.js";
import { getDomain } from "../utils/get-domain.utils.js";
import { getNextInstallmentDate } from "../utils/get-next-installment-date.utils.js";
import * as orderService from "./order.service.js";

export const createSip = async ({
  userId,
  amount,
  sipDate,
  schemeCode,
  fundName,
  fundShortName, // required for order placement
  fundCategory,
  fundHouseDomain,
  fundType, // required for order placement
}) => {
  //1. create/subscribe to new SIP
  const sip = await db.mfSip.create({
    data: {
      userId,
      amount,
      sipDate,
      schemeCode,
      fundName,
      fundShortName,
      fundType: fundType.toUpperCase(),
      fundCategory,
      fundHouseDomain: getDomain(fundHouseDomain),
      nextInstallmentDate: getNextInstallmentDate(sipDate),
    },
  });

  //2. place initial investment order
  const order = await orderService.placeInvestmentOrder({
    sipId: sip.id,
    userId,
    amount,
    fundName,
    fundShortName, //
    fundCategory,
    schemeCode,
    fundHouseDomain,
    fundType: fundType.toUpperCase(), //
  });

  return { sip, order };
};

export const editSip = async ({ userId, sipId, amount, sipDate }) => {
  // Fetch the current SIP
  const sip = await db.mfSip.findUnique({ where: { id: sipId, userId } });
  if (!sip) {
    throw new ApiError(404, "SIP not found");
  }

  if (amount === sip.amount && sipDate === sip.sipDate) {
    throw new ApiError(400, "No changes detected");
  }

  const diffDays = differenceInDays(sip.nextInstallmentDate, new Date(), {
    in: tz("Asia/Kolkata"),
  });

  // If next installment is more than 2 days away, update directly
  if (diffDays > 2) {
    return await db.mfSip.update({
      where: { id: sipId },
      data: {
        amount,
        sipDate,
        nextInstallmentDate: getNextInstallmentDate(sipDate),
      },
    });
  }

  // Otherwise, create or update a pending change
  await db.pendingMfSipChange.upsert({
    where: { userId_sipId: { userId, sipId } },
    create: {
      userId,
      sipId,
      amount,
      sipDate,
      applyDate: addDays(sip.nextInstallmentDate, 1), // apply the changes after the next installment
    },
    update: {
      amount,
      sipDate,
      applyDate: addDays(sip.nextInstallmentDate, 1), // apply the changes after the next installment
    },
  });
};

export const skipSip = async (userId, sipId) => {
  const sip = await db.mfSip.findUnique({ where: { id: sipId, userId } });
  if (!sip) {
    throw new ApiError(404, "SIP not found");
  }

  const diffDays = differenceInDays(sip.nextInstallmentDate, new Date(), {
    in: tz("Asia/Kolkata"),
  });

  // If next installment is more than 2 days away, update directly
  if (diffDays > 2) {
    return await db.mfSip.update({
      where: { id: sipId },
      data: {
        nextInstallmentDate: addMonths(sip.nextInstallmentDate, 1),
      },
    });
  }

  // Otherwise, create or update a pending change
  await db.pendingMfSipChange.upsert({
    where: { userId_sipId: { userId, sipId } },
    create: {
      userId,
      sipId,
      nextInstallmentDate: addMonths(sip.nextInstallmentDate, 1),
      applyDate: addDays(sip.nextInstallmentDate, 1), // apply the changes after the next installment
    },
    update: {
      nextInstallmentDate: addMonths(sip.nextInstallmentDate, 1),
      applyDate: addDays(sip.nextInstallmentDate, 1), // apply the changes after the next installment
    },
  });
};

export const cancelSip = async (sipId) => {
  // Fetch the current SIP
  const sip = await db.mfSip.findUnique({ where: { id: sipId } });
  if (!sip) {
    throw new ApiError(404, "SIP not found");
  }

  const diffDays = differenceInDays(sip.nextInstallmentDate, new Date(), {
    in: tz("Asia/Kolkata"),
  });

  if (diffDays <= 3) {
    throw new ApiError(
      400,
      "You Can't cancel SIP before 3 days of next installment"
    );
  }

  await db.mfSip.delete({ where: { id: sipId } });
};

export const getAllSips = async (userId) => {
  const allSips = await db.mfSip.findMany({ where: { userId } });
  const activeSipAmount = await db.mfSip.aggregate({
    where: { userId },
    _sum: { amount: true },
  });

  if (!allSips.length) {
    throw new ApiError(404, "No Active SIP's Found");
  }

  return {
    totalActiveSipAmount: activeSipAmount._sum.amount,
    allSips,
  };
};

export const getSipDetail = async (sipId) => {
  const sipDetail = await db.mfSip.findUnique({ where: { id: sipId } });

  const installments = await db.mfOrder.findMany({
    where: { sipId },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { sipDetail, installments };
};
