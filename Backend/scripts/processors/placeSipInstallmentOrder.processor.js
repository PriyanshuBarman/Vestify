import { addMonths } from "date-fns";
import { db } from "../../config/db.config.js";

import { getNavAndProcessDateForSip } from "../utils/getNavAndProcessDateForSip.utils.js";

export const placeSipInstallmentOrder = async (data) => {
  const {
    userId,
    id: sipId,
    amount,
    schemeCode,
    fundName,
    fundShortName,
    fundType,
    fundCategory,
    fundHouseDomain,
    nextInstallmentDate,
  } = data;

  const { processDate, navDate } = getNavAndProcessDateForSip(
    nextInstallmentDate,
    fundCategory
  );

  // prisma $transaction
  await db.$transaction(async (tx) => {
    // 1. Fetch user balance
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });
    if (!user) throw new Error("User not found");

    // 2. Create FAILED order for insufficient balance
    if (amount.toNumber() > user.balance.toNumber()) {
      await tx.mfOrder.create({
        data: {
          sipId,
          userId,
          amount,
          schemeCode,
          fundName,
          fundShortName,
          fundType,
          fundHouseDomain,
          processDate,
          navDate,
          method: "SIP",
          orderType: "SIP_INSTALLMENT",
          status: "FAILED",
          failureReason: "Insufficient balance",
        },
      });
      await tx.mfSip.update({
        where: { id: sipId },
        data: { nextInstallmentDate: addMonths(nextInstallmentDate, 1) },
      });
      // Early return to exit the transaction
      return;
    }

    // 3. Deduct balance
    const { balance: updatedBalance } = await tx.user.update({
      where: { id: userId },
      data: { balance: { decrement: amount } },
    });

    // 4. Create/Place order
    const order = await tx.mfOrder.create({
      data: {
        sipId,
        userId,
        amount,
        schemeCode,
        fundName,
        fundShortName,
        fundType,
        fundHouseDomain,
        processDate,
        navDate,
        method: "SIP",
        orderType: "SIP_INSTALLMENT",
      },
    });

    // 5. Create transaction
    await tx.transaction.create({
      data: {
        userId,
        amount,
        assetCategory: "MUTUAL_FUND",
        assetOrderId: order.id,
        type: "DEBIT",
        updatedBalance,
      },
    });

    // 6. Update next installment date
    await tx.mfSip.update({
      where: { id: sipId },
      data: { nextInstallmentDate: addMonths(nextInstallmentDate, 1) },
    });
  });
};
