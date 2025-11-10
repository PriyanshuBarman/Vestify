import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { navCache } from "../external/fetch-nav-by-date.js";
import {
  processInvestmentOrder,
  processRedemptionOrder,
} from "../processors/order-processor.js";
import { printSummary } from "../utils/print-summary.utils.js";
import { db } from "#config/db.config.js";

async function processOrders() {
  navCache.clear();

  const today = new Date(format(TZDate.tz("Asia/Kolkata"), "yyyy-MM-dd"));
  const orders = await db.mfOrder.findMany({
    where: {
      status: "PENDING",
      processDate: { lte: today },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!orders.length) {
    return console.log("No Pending orders to process");
  }

  let failureCount = 0;
  let successCount = 0;
  const BATCH_SIZE = 4;

  for (let i = 0; i < orders.length; i += BATCH_SIZE) {
    const batch = orders.slice(i, i + BATCH_SIZE);

    await Promise.allSettled(
      batch.map(async (order) => {
        try {
          if (
            order.orderType === "ONE_TIME" ||
            order.orderType === "NEW_SIP" ||
            order.orderType === "SIP_INSTALLMENT"
          ) {
            await processInvestmentOrder(order);
            successCount++;
          }
          if (order.orderType === "REDEEM") {
            await processRedemptionOrder(order);
            successCount++;
          }
        } catch (error) {
          failureCount++;
          console.error("❌", error.message);
        }
      })
    );
  }

  printSummary(orders.length, successCount, failureCount);
}

processOrders()
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
