import { db } from "@/config/db.config.js";
import type { PendingMfSipChange } from "@prisma/client";

export const applySipChanges = async (data: PendingMfSipChange) => {
  const { id, sipId, amount, sipDate, nextInstallmentDate } = data;

  await db.$transaction(async (tx) => {
    await tx.mfSip.update({
      where: { id: sipId },
      data: {
        amount: amount || undefined,
        sipDate: sipDate || undefined,
        nextInstallmentDate: nextInstallmentDate || undefined,
      },
    });

    await tx.pendingMfSipChange.delete({ where: { id } });
  });
};
