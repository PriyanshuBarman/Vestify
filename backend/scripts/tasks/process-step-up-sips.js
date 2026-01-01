import db from "#config/db.config.js";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { processStepUp } from "../processors/step-up-sip-processor.js";
import { printSummary } from "../utils/print-summary.utils.js";

async function stepUpSip() {
  const today = new Date(format(TZDate.tz("Asia/Kolkata"), "yyyy-MM-dd"));
  const stepUps = await db.mfSip.findMany({
    where: {
      nextStepUpDate: { lte: today },
    },
  });

  if (!stepUps.length) {
    return console.log("No Step-up's to process");
  }

  let failureCount = 0;
  let successCount = 0;
  const BATCH_SIZE = 4;

  for (let i = 0; i < stepUps.length; i += BATCH_SIZE) {
    const batch = stepUps.slice(i, i + BATCH_SIZE);

    await Promise.allSettled(
      batch.map(async (sip) => {
        try {
          await processStepUp(sip);
          successCount++;
        } catch (error) {
          failureCount++;
          console.error("❌", error.message);
        }
      })
    );
  }

  printSummary(stepUps.length, successCount, failureCount);
}

stepUpSip()
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
