import { db } from "../../../config/db.config.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const applyReferralBonus = async (userId, referralCode) => {
  const REFERRER_BONUS = 10000;
  const NEW_USER_BONUS = 5000;

  await db.$transaction(async (tx) => {
    // Credit referrer
    const referrer = await tx.user.update({
      where: { profile: { username: referralCode } },
      data: {
        balance: { credit: REFERRER_BONUS },
      },
    });

    if (!referrer) {
      throw new ApiError(400, "Invalid Referral Code");
    }

    // Credit user
    const user = await tx.user.update({
      where: { id: userId },
      data: {
        balance: { increment: NEW_USER_BONUS },
      },
    });

    // Create transaction history for referrer and user
    await tx.transaction.createMany({
      data: [
        {
          userId,
          amount: REFERRER_BONUS,
          type: "CREDIT",
          updatedBalance: referrer.balance,
          peerUserId: "system",
        },
        {
          userId,
          amount: NEW_USER_BONUS,
          type: "CREDIT",
          updatedBalance: user.balance,
          peerUserId: "system",
        },
      ],
    });
  });
};
