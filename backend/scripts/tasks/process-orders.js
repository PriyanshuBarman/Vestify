import db from "#config/db.config.js";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { navCache } from "../external/fetch-nav-by-date.js";
import {
  processInvestmentOrder,
  processRedemptionOrder,
} from "../processors/order-processor.js";
import { printSummary } from "../utils/print-summary.utils.js";

async function processOrders() {
  navCache.clear();

  const today = new Date(format(TZDate.tz("Asia/Kolkata"), "yyyy-MM-dd"));
  const orders = await db.mfOrder.findMany({
    where: {
      status: "PENDING",
      processDate: { lte: today },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!orders.length) {
    return console.log("No Pending orders to process");
  }

  let failureCount = 0;
  let successCount = 0;
  for (const order of orders) {
    try {
      if (order.orderType === "REDEEM") {
        await processRedemptionOrder(order);
      } else {
        await processInvestmentOrder(order);
      }
      successCount++;
    } catch (error) {
      failureCount++;
      console.error("❌", error.message);
    }
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
