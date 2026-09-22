import { db } from "@/config/db.config.js";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { placeStockSipInstallmentOrder } from "../processors/stock-sip-installment-processor.js";
import { printSummary } from "../utils/print-summary.utils.js";

async function placeStockSipInstallmentOrders() {
  const today = new Date(format(TZDate.tz("Asia/Kolkata"), "yyyy-MM-dd"));
  const activeSips = await db.stockSip.findMany({
    where: {
      nextInstallmentDate: { lte: today },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!activeSips.length) {
    return console.log("No Stock SIPs for installment process");
  }

  let failureCount = 0;
  let successCount = 0;
  const BATCH_SIZE = 4;

  for (let i = 0; i < activeSips.length; i += BATCH_SIZE) {
    const batch = activeSips.slice(i, i + BATCH_SIZE);

    await Promise.allSettled(
      batch.map(async (sip) => {
        try {
          await placeStockSipInstallmentOrder(sip);
          successCount++;
        } catch (error: any) {
          failureCount++;
          console.error("❌", error?.message);
        }
      }),
    );
  }

  printSummary(activeSips.length, successCount, failureCount);
}

placeStockSipInstallmentOrders()
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
