import { db } from "@/config/db.config.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import { tz } from "@date-fns/tz";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import type {
  CreateStockSipSchema,
  EditStockSipSchema,
} from "../schemas/sip.schema.js";
import { getNextStockSipDate } from "../utils/get-next-sip-date.utils.js";

export const createSip = async ({
  userId,
  symbol,
  name,
  shortName,
  frequency,
  type,
  sipDate,
  amount,
  quantity,
}: CreateStockSipSchema & { userId: string }) => {
  const nextInstallmentDate = getNextStockSipDate(frequency, sipDate);

  const sip = await db.stockSip.create({
    data: {
      userId,
      symbol,
      name,
      shortName,
      frequency,
      type,
      sipDate,
      amount,
      quantity,
      nextInstallmentDate,
    },
  });

  return { sip };
};

export const editSip = async ({
  userId,
  sipId,
  frequency,
  type,
  sipDate,
  amount,
  quantity,
}: EditStockSipSchema & { userId: string; sipId: string }) => {
  const sip = await db.stockSip.findUnique({ where: { id: sipId } });
  if (!sip) throw new ApiError(404, "SIP not found");

  const newFrequency = frequency ?? sip.frequency;
  const newType = type ?? sip.type;
  const newSipDate = sipDate ?? sip.sipDate;

  const newAmount =
    newType === "AMOUNT" ? (amount ?? sip.amount?.toNumber()) : null;
  const newQuantity =
    newType === "QUANTITY" ? (quantity ?? sip.quantity) : null;

  if (
    newFrequency === sip.frequency &&
    newType === sip.type &&
    newSipDate === sip.sipDate &&
    newAmount === sip.amount?.toNumber() &&
    newQuantity === sip.quantity
  ) {
    throw new ApiError(400, "No changes detected");
  }

  const diffDays = differenceInCalendarDays(
    sip.nextInstallmentDate,
    new Date(),
    {
      in: tz("Asia/Kolkata"),
    },
  );

  const immediateNextInstallmentDate = getNextStockSipDate(
    newFrequency,
    newSipDate,
  );

  const queuedNextInstallmentDate = getNextStockSipDate(
    newFrequency,
    newSipDate,
    sip.nextInstallmentDate,
  );

  // ====== If next installment is more than 2 days away, update directly ======
  if (diffDays > 2) {
    await db.stockSip.update({
      where: { id: sipId },
      data: {
        frequency: newFrequency,
        type: newType,
        sipDate: newSipDate,
        amount: newAmount,
        quantity: newQuantity,
        nextInstallmentDate: immediateNextInstallmentDate,
      },
    });

    return { message: "SIP updated successfully", notice: undefined };
  }

  // ====== Otherwise, create or update a pending change ======
  const applyDate = addDays(sip.nextInstallmentDate, 1); // apply the changes after the next installment

  await db.pendingStockSipChange.upsert({
    where: { userId_sipId: { userId, sipId } },
    create: {
      userId,
      sipId,
      frequency: newFrequency,
      type: newType,
      sipDate: newSipDate,
      amount: newAmount,
      quantity: newQuantity,
      nextInstallmentDate: queuedNextInstallmentDate,
      applyDate: applyDate,
    },
    update: {
      frequency: newFrequency,
      type: newType,
      sipDate: newSipDate,
      amount: newAmount,
      quantity: newQuantity,
      nextInstallmentDate: queuedNextInstallmentDate,
      applyDate: applyDate,
    },
  });

  return {
    message: "Changes queued successfully",
    notice: `Because your next SIP date is too close, these changes will take effect after ${format(sip.nextInstallmentDate, "do MMM, yyyy")}.`,
  };
};

export const cancelSip = async (sipId: string) => {
  const sip = await db.stockSip.findUnique({ where: { id: sipId } });
  if (!sip) {
    throw new ApiError(404, "SIP not found");
  }

  const diffDays = differenceInCalendarDays(
    sip.nextInstallmentDate,
    new Date(),
    {
      in: tz("Asia/Kolkata"),
    },
  );

  if (diffDays <= 2) {
    throw new ApiError(
      400,
      "You cannot cancel SIP within 2 days of the next installment.",
    );
  }

  await db.stockSip.delete({ where: { id: sipId } });
};

export const getAllSips = async (userId: string) => {
  const sips = await db.stockSip.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      pendingChanges: true,
    },
  });

  return { sips };
};

export const getSipDetail = async (sipId: string, userId: string) => {
  const sip = await db.stockSip.findFirst({
    where: { id: sipId, userId },
    include: {
      pendingChanges: true,
      orders: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!sip) {
    throw new ApiError(404, "SIP not found");
  }

  return { sip };
};
