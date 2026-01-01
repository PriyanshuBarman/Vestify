import db from "#config/db.config.js";
import { tz } from "@date-fns/tz";
import { addMonths } from "date-fns";

export const processStepUp = async (data) => {
  let {
    id: sipId,
    amount,
    stepUpAmount,
    nextStepUpDate,
    stepUpPercentage,
    stepUpIntervalInMonths,
  } = data;
  const currentAmount = amount.toNumber();
  stepUpAmount = stepUpAmount?.toNumber();

  const newSipAmount = stepUpAmount
    ? currentAmount + stepUpAmount
    : currentAmount + currentAmount * (stepUpPercentage / 100);

  const newNextStepUpDate = addMonths(
    new Date(nextStepUpDate),
    stepUpIntervalInMonths,
    { in: tz("Asia/Kolkata") }
  );

  await db.mfSip.update({
    where: { id: sipId },
    data: {
      amount: newSipAmount,
      nextStepUpDate: newNextStepUpDate,
    },
  });
};
