import { db } from "@/config/db.config.js";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { printSummary } from "../utils/print-summary.utils.js";
import type { PendingStockSipChange } from "@prisma/client";

async function applyStockSipChange(pendingChange: PendingStockSipChange) {
  await db.$transaction(async (tx) => {
    // 1. Update the original SIP
    await tx.stockSip.update({
      where: { id: pendingChange.sipId },
      data: {
        frequency: pendingChange.frequency ?? undefined,
        type: pendingChange.type ?? undefined,
        sipDate: pendingChange.sipDate ?? undefined,
        amount: pendingChange.amount ?? undefined,
        quantity: pendingChange.quantity ?? undefined,
        nextInstallmentDate: pendingChange.nextInstallmentDate ?? undefined,
      },
    });

    // 2. Delete the pending change
    await tx.pendingStockSipChange.delete({
      where: { id: pendingChange.id },
    });
  });
}

export async function applyStockSipChanges() {
  const today = new Date(format(TZDate.tz("Asia/Kolkata"), "yyyy-MM-dd"));
  const pendingChanges = await db.pendingStockSipChange.findMany({
    where: {
      applyDate: { lte: today },
    },
  });

  if (!pendingChanges.length) {
    return console.log("No pending Stock SIP changes to apply");
  }

  let failureCount = 0;
  let successCount = 0;
  const BATCH_SIZE = 4;

  for (let i = 0; i < pendingChanges.length; i += BATCH_SIZE) {
    const batch = pendingChanges.slice(i, i + BATCH_SIZE);

    await Promise.allSettled(
      batch.map(async (sip) => {
        try {
          await applyStockSipChange(sip);
          successCount++;
        } catch (error: any) {
          failureCount++;
          console.error("❌", error?.message);
        }
      }),
    );
  }

  printSummary(pendingChanges.length, successCount, failureCount);
}

applyStockSipChanges()
  .then(() => {
    console.log("✅ Task completed");
  })
  .catch((error) => {
    console.error("❌ Task failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
    process.exit();
  });
