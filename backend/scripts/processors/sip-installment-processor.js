import db from "#config/db.config.js";
import { addMonths, setDate } from "date-fns";
import { getApplicableDates } from "../utils/get-applicable-dates.utils.js";
import { tz } from "@date-fns/tz";

export const placeSipInstallmentOrder = async (data) => {
  const {
    userId,
    id: sipId,
    amount,
    sipDate,
    fundName,
    fundShortName,
    schemeCode,
    fundType,
    fundCategory,
    fundHouseDomain,
    nextInstallmentDate,
    failedCount,
  } = data;

  const { processDate, navDate } = getApplicableDates(
    nextInstallmentDate,
    fundCategory,
  );

  const newNextInstallmentDate = addMonths(
    setDate(new Date(nextInstallmentDate), sipDate),
    1,
    { in: tz("Asia/Kolkata") },
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
      // If failed count reaches 3, delete the SIP
      if (failedCount + 1 >= 3) {
        await tx.mfSip.delete({
          where: { id: sipId },
        });
        return;
      }
      await tx.mfSip.update({
        where: { id: sipId },
        data: {
          nextInstallmentDate: newNextInstallmentDate,
          failedCount: {
            increment: 1,
          },
        },
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
      data: {
        failedCount: 0,
        nextInstallmentDate: newNextInstallmentDate,
      },
    });
  });
};
