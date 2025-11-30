import db from "#config/db.config.js";
import config from "#config/env.config.js";
import { sendUserEvent } from "#shared/events/event-manager.js";
import { ApiError } from "#shared/utils/api-error.utils.js";

export const validateReferral = async (ip, referralCode) => {
  if (!referralCode) return null;

  const referrer = await db.profile.findUnique({
    where: { username: referralCode },
    select: {
      userId: true,
      user: {
        select: {
          sessions: {
            orderBy: { updatedAt: "desc" },
            select: {
              ip: true,
            },
          },
        },
      },
    },
  });

  if (!referrer) {
    throw new ApiError(400, "Invalid referral code");
  }

  const hasSameSession = referrer.user.sessions.some((s) => s.ip === ip);

  if (hasSameSession) {
    throw new ApiError(
      400,
      "Referral not allowed from the same device or network"
    );
  }

  return referrer;
};

export const applyReferralBonus = async (referrerId, userId) => {
  const REFERRER_REWARD = Number(config.REFERRER_REWARD_AMOUNT);
  const REFERRED_USER_REWARD = Number(config.REFERRED_USER_REWARD_AMOUNT);

  const { referrer, user } = await db.$transaction(async (tx) => {
    // Credit referrer
    const referrer = await tx.user.update({
      where: { id: referrerId },
      data: {
        balance: { increment: REFERRER_REWARD },
      },
    });

    if (!referrer) {
      throw new ApiError(400, "Invalid Referral Code");
    }

    // Credit user
    const user = await tx.user.update({
      where: { id: userId },
      data: {
        balance: { increment: REFERRED_USER_REWARD },
      },
    });

    // Create transaction history for referrer and user
    await tx.transaction.createMany({
      data: [
        {
          userId: referrerId,
          amount: REFERRER_REWARD,
          type: "CREDIT",
          updatedBalance: referrer.balance,
          peerUserId: "system",
        },
        {
          userId,
          amount: REFERRED_USER_REWARD,
          type: "CREDIT",
          updatedBalance: user.balance,
          peerUserId: "system",
        },
      ],
    });

    // Create referral record for referrer
    await tx.referral.create({
      data: {
        userId: referrer.id,
        amount: REFERRER_REWARD,
        referredUserId: user.id,
      },
    });

    return { referrer, user };
  });

  sendUserEvent(referrer.id, { balance: referrer.balance });
  sendUserEvent(user.id, { balance: user.balance });
};
