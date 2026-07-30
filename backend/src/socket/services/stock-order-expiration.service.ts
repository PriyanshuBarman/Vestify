import { db } from "@/config/db.config.js";

export async function expireOutdatedStockOrders(): Promise<void> {
  try {
    await db.stockOrder.updateMany({
      where: {
        status: "OPEN",
        expiresAt: { lt: new Date() },
      },
      data: {
        status: "UNSUCCESSFUL",
        failureReason:
          "Retry within the allowed price range or choose market order",
      },
    });
  } catch (error: unknown) {
    console.error(
      "Failed to expire outdated stock orders:",
      error instanceof Error ? error.message : error,
    );
  }
}
