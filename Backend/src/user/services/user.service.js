import { tz, TZDate } from "@date-fns/tz";
import { endOfToday, isToday, startOfToday } from "date-fns";
import { db } from "../../../config/db.config.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";
import { sendUserEvent } from "../../shared/events/eventManager.js";

export const getMe = async (userId) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      hasPin: true,
      createdAt: true,
      profile: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const claimDailyReward = async (userId) => {
  const rewardAmount = 1000;

  const updatedBalance = await db.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ApiError(404, "User not found");
    if (
      user.lastRewardedAt &&
      isToday(user.lastRewardedAt, { in: tz("Asia/Kolkata") })
    ) {
      throw new ApiError(400, "Already rewarded today");
    }

    const { balance: updatedBalance } = await tx.user.update({
      where: { id: userId },
      data: {
        balance: { increment: rewardAmount },
        lastRewardedAt: TZDate.tz("Asia/Kolkata"),
      },
    });

    await tx.transaction.create({
      data: {
        userId,
        amount: rewardAmount,
        type: "CREDIT",
        updatedBalance,
        peerUserId: "system",
      },
    });

    return updatedBalance;
  });

  sendUserEvent(userId, { balance: updatedBalance });

  return updatedBalance;
};
