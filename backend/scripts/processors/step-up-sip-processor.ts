import { db } from "@/config/db.config.js";
import type { MfSip } from "@prisma/client";
import { tz } from "@date-fns/tz";
import { addMonths } from "date-fns";

export const processStepUp = async (data: MfSip) => {
  const {
    id: sipId,
    amount,
    stepUpAmount,
    nextStepUpDate,
    stepUpPercentage,
    stepUpIntervalInMonths,
  } = data;

  if (!nextStepUpDate || !stepUpIntervalInMonths) return;

  const currentAmount = amount?.toNumber();
  const stepUpAmountNum = stepUpAmount?.toNumber();

  const newSipAmount = stepUpAmountNum
    ? currentAmount + stepUpAmountNum
    : currentAmount +
      currentAmount * ((stepUpPercentage?.toNumber() ?? 0) / 100);

  const newNextStepUpDate = addMonths(
    new Date(nextStepUpDate),
    stepUpIntervalInMonths,
    { in: tz("Asia/Kolkata") },
  );

  await db.mfSip.update({
    where: { id: sipId },
    data: {
      amount: newSipAmount,
      nextStepUpDate: newNextStepUpDate,
    },
  });
};
