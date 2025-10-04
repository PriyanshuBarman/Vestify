import { formatDate } from "date-fns";
import { db } from "../../../config/db.config.js";
import { sendUserEvent } from "../../shared/events/eventManager.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const sendMoney = async (userId, amount, note, receiverId) => {
  const { sender, receiver } = await db.$transaction(async (tx) => {
    // 1. Debit sender balance
    const sender = await tx.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: amount },
      },
    });

    // 2. Ensure sender has enough balance
    if (sender.balance < 0) {
      throw new ApiError(400, "Insufficient Balance");
    }

    // 3. Credit receiver balance
    const receiver = await tx.user.update({
      where: { id: receiverId },
      data: {
        balance: { increment: amount },
      },
    });

    // 4. Create transaction history for sender and receiver
    await tx.transaction.createMany({
      data: [
        {
          userId,
          amount,
          note,
          type: "DEBIT",
          updatedBalance: sender.balance,
          peerUserId: receiverId,
        },
        {
          userId: receiverId,
          amount,
          type: "CREDIT",
          updatedBalance: receiver.balance,
          peerUserId: userId,
        },
      ],
    });

    return { sender, receiver };
  });

  sendUserEvent(userId, { balance: sender.balance });
  sendUserEvent(receiverId, { balance: receiver.balance });
};

export const fetchAllTnx = async (userId) => {
  const tnx = await db.transaction.findMany({
    where: { userId },
    include: {
      peerUser: {
        select: {
          profile: true,
        },
      },
      assetOrder: true,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!tnx.length) {
    throw new ApiError(404, "No transactions found");
  }

  // Group transactions by month (YYYY-MM) and calculate summary
  const grouped = tnx.reduce((acc, transaction) => {
    const monthKey = formatDate(transaction.createdAt, "MMMM yy");

    // Find if month already exists
    let monthGroup = acc.find((m) => m.month === monthKey);

    if (!monthGroup) {
      monthGroup = { month: monthKey, transactions: [], summary: 0 };
      acc.push(monthGroup);
    }

    // Push transaction
    monthGroup.transactions.push(transaction);

    // Update summary
    if (transaction.type === "DEBIT") {
      monthGroup.summary -= transaction.amount.toNumber();
    } else if (transaction.type === "CREDIT") {
      monthGroup.summary += transaction.amount.toNumber();
    }

    return acc;
  }, []);

  return grouped;
};

export const fetchBalance = async (userId) => {
  const { balance } = await db.user.findUnique({
    where: { id: userId },
    select: { balance: true },
  });

  return balance;
};
