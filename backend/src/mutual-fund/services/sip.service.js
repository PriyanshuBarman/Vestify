import db from "#config/db.config.js";
import { ApiError } from "#shared/utils/api-error.utils.js";
import { tz } from "@date-fns/tz";
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  setDate,
} from "date-fns";
import { getDomain } from "../utils/get-domain.utils.js";
import { getNextInstallmentDate } from "../utils/get-next-installment-date.utils.js";
import { getSipEditResponse } from "../utils/sip.utils.js";
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
  // 1. create/subscribe to new SIP
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
      nextInstallmentDate: addMonths(setDate(new Date(), sipDate), 1),
    },
  });

  // 2. place initial investment order
  const order = await orderService.placeInvestmentOrder({
    sipId: sip.id,
    userId,
    amount,
    fundName,
    fundShortName,
    fundCategory,
    schemeCode,
    fundHouseDomain,
    fundType: fundType.toUpperCase(),
  });

  return { sip, order };
};

export const editSip = async ({ sipId, amount, sipDate }) => {
  const sip = await db.mfSip.findUnique({ where: { id: sipId } });
  if (!sip) throw new ApiError(404, "SIP not found");

  amount = amount ?? sip.amount.toNumber();
  sipDate = sipDate ?? sip.sipDate;

  if (Number(amount) === sip.amount.toNumber() && sipDate === sip.sipDate) {
    throw new ApiError(400, "No changes detected");
  }

  const diffDays = differenceInCalendarDays(
    sip.nextInstallmentDate,
    new Date(),
    {
      in: tz("Asia/Kolkata"),
    }
  );

  const newNextInstallmentDate = getNextInstallmentDate(
    sipDate,
    sip.nextInstallmentDate
  );

  // ====== If next installment is more than 2 days away, update directly ======
  if (diffDays > 2) {
    await db.mfSip.update({
      where: { id: sipId },
      data: {
        amount,
        sipDate,
        nextInstallmentDate: newNextInstallmentDate,
      },
    });

    return { message: "SIP updated successfully" };
  }

  // ====== Otherwise, create or update a pending change ======
  const applyDate = addDays(sip.nextInstallmentDate, 1); // apply the changes after the next installment

  await db.pendingMfSipChange.upsert({
    where: { userId_sipId: { userId, sipId } },
    create: {
      userId,
      sipId,
      amount,
      sipDate,
      nextInstallmentDate: newNextInstallmentDate,
      applyDate: applyDate,
    },
    update: {
      amount,
      sipDate,
      nextInstallmentDate: newNextInstallmentDate,
      applyDate: applyDate,
    },
  });

  return getSipEditResponse(applyDate, sip.nextInstallmentDate);
};

export const skipSip = async (userId, sipId) => {
  const sip = await db.mfSip.findUnique({ where: { id: sipId, userId } });
  if (!sip) {
    throw new ApiError(404, "SIP not found");
  }

  const diffDays = differenceInCalendarDays(
    sip.nextInstallmentDate,
    new Date(),
    {
      in: tz("Asia/Kolkata"),
    }
  );

  // ===== If next installment is more than 2 days away, update directly =====
  if (diffDays > 2) {
    const newNextInstallmentDate = addMonths(sip.nextInstallmentDate, 1);

    return await db.mfSip.update({
      where: { id: sipId },
      data: {
        nextInstallmentDate: newNextInstallmentDate,
      },
    });
  }

  // ===== Otherwise, create or update a pending change =====
  const applyDate = addDays(sip.nextInstallmentDate, 1); // apply the changes after the next installment
  const newNextInstallmentDate = addMonths(sip.nextInstallmentDate, 2);

  await db.pendingMfSipChange.upsert({
    where: { userId_sipId: { userId, sipId } },
    create: {
      userId,
      sipId,
      applyDate,
      nextInstallmentDate: newNextInstallmentDate,
    },
    update: {
      applyDate,
      nextInstallmentDate: newNextInstallmentDate,
    },
  });
};

export const cancelSip = async (sipId) => {
  // Fetch the current SIP
  const sip = await db.mfSip.findUnique({ where: { id: sipId } });
  if (!sip) {
    throw new ApiError(404, "SIP not found");
  }

  const diffDays = differenceInCalendarDays(
    sip.nextInstallmentDate,
    new Date(),
    {
      in: tz("Asia/Kolkata"),
    }
  );

  if (diffDays <= 2) {
    throw new ApiError(
      400,
      "You Can't cancel SIP before 2 days of next installment"
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

// ---------------------------------------------------
// Step-up SIP services
// ---------------------------------------------------

export const addEditStepUp = async ({
  sipId,
  amount,
  percentage,
  intervalInMonths,
}) => {
  return await db.mfSip.update({
    where: { id: sipId },
    data: {
      stepUpAmount: amount ?? null,
      stepUpPercentage: percentage ?? null,
      stepUpIntervalInMonths: intervalInMonths,
      nextStepUpDate: addMonths(new Date(), intervalInMonths, {
        in: tz("Asia/Kolkata"),
      }),
    },
  });
};

export const removeStepUp = async (sipId) => {
  return await db.mfSip.update({
    where: { id: sipId },
    data: {
      stepUpAmount: null,
      stepUpPercentage: null,
      stepUpIntervalInMonths: null,
      nextStepUpDate: null,
    },
  });
};
