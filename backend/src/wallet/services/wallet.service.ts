import { db } from "@/config/db.config.js";
import { sendUserEvent } from "@/shared/events/event-manager.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import { formatDate } from "date-fns";
import type { SendMoneySchema } from "../schemas/wallet.schema.js";

export const sendMoney = async ({
  userId,
  amount,
  note,
  receiverId,
}: SendMoneySchema & { userId: string }) => {
  const { sender, receiver } = await db.$transaction(async (tx) => {
    // 1. Debit sender balance
    const sender = await tx.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: amount },
      },
    });

    if (sender.id < userId) {
      throw new ApiError(400, "You cannot send money to yourself");
    }
    // 2. Ensure sender has enough balance
    if (sender.balance.toNumber() < 0) {
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
          note: note,
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

export const getAllTnx = async (userId: string) => {
  const transactions = await db.transaction.findMany({
    where: { userId },
    include: {
      peerUser: {
        select: {
          profile: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  type TransactionWithPeer = (typeof transactions)[number];
  type GroupedTransaction = {
    month: string;
    transactions: TransactionWithPeer[];
    summary: number;
  };

  // Group transactions by month (YYYY-MM) and calculate summary
  const grouped = transactions.reduce<GroupedTransaction[]>(
    (acc, transaction) => {
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
    },
    [],
  );

  return grouped;
};

export const getBalance = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { balance: true },
  });

  return user?.balance;
};
