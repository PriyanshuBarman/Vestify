import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { placeSipInstallmentOrder } from "../processors/sip-installment-processor.js";
import { printSummary } from "../utils/print-summary.utils.js";
import { db } from "../../config/db.config.js";

async function placeSipInstallmentOrders() {
  const today = new Date(format(TZDate.tz("Asia/Kolkata"), "yyyy-MM-dd"));
  const activeSips = await db.mfSip.findMany({
    where: {
      nextInstallmentDate: today,
    },
  });

  if (!activeSips.length) {
    return console.log("No SIP's for installment process");
  }

  let failureCount = 0;
  let successCount = 0;
  const BATCH_SIZE = 4;

  for (let i = 0; i < activeSips.length; i += BATCH_SIZE) {
    const batch = activeSips.slice(i, i + BATCH_SIZE);

    await Promise.allSettled(
      batch.map(async (sip) => {
        try {
          await placeSipInstallmentOrder(sip);
          successCount++;
        } catch (error) {
          failureCount++;
          console.error("❌", error.message);
        }
      })
    );
  }

  printSummary(activeSips.length, successCount, failureCount);
}

placeSipInstallmentOrders()
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
