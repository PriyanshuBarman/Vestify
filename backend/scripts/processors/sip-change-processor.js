import { db } from "../../config/db.config.js";

export const applySipChanges = async (data) => {
  const { id, sipId, amount, dateOfMonth, nextInstallmentDate } = data;

  await db.$transaction(async (tx) => {
    await db.mfSip.update({
      where: { id: sipId },
      data: {
        amount: amount || undefined,
        dateOfMonth: dateOfMonth || undefined,
        nextInstallmentDate: nextInstallmentDate || undefined,
      },
    });

    await db.pendingMfSipChange.delete({ where: { id } });
  });
};
