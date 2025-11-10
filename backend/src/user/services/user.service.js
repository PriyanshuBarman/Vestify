import { tz, TZDate } from "@date-fns/tz";
import { isToday } from "date-fns";
import { db } from "#config/db.config.js";
import { sendUserEvent } from "#shared/events/event-manager.js";
import { ApiError } from "#shared/utils/api-error.utils.js";
import cloudinary from "#config/cloudinary.config.js";

export const getUser = async (userId) => {
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

  if (!user) throw new ApiError(404, "User not found");

  return user;
};

export const getReferrals = async (userId) => {
  const referrals = await db.referral.findMany({
    where: { userId },
    select: {
      id: true,
      amount: true,
      createdAt: true,
      referredUser: {
        select: {
          profile: true,
        },
      },
    },
  });

  if (!referrals.length) {
    throw new ApiError(404, "No referrals found");
  }

  return referrals;
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

// ----------------------------------------------------------------------
//  Profile
// ----------------------------------------------------------------------

export const updateProfile = async (userId, name, username) => {
  const profile = await db.profile.update({
    where: { userId },
    data: { name, username },
  });

  return profile;
};

export const uploadAvatar = async (userId, file) => {
  const fileBuffer = file.buffer;
  try {
    await deleteAvatar(userId); // delete old image

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "Vestify-User-Avatars",
          resource_type: "auto",
          allowed_formats: ["png", "jpg", "jpeg", "webp"],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(fileBuffer);
    });

    const profile = await db.profile.update({
      where: { userId },
      data: { avatar: result.secure_url },
    });

    return profile.avatar;
  } catch (error) {
    throw new ApiError(
      error?.http_code || 500,
      error?.message || "Internal server error"
    );
  }
};

export const deleteAvatar = async (userId) => {
  const profile = await db.profile.findUnique({
    where: { userId },
    select: { avatar: true },
  });

  // Only delete from Cloudinary if the avatar is stored there
  // (not for null avatars or Google OAuth profile images)
  if (profile?.avatar?.startsWith("https://res.cloudinary.com/")) {
    const publicId = profile.avatar
      .split("/")
      .slice(-2) // Get last two parts
      .join("/") // Join them with a slash
      .replace(/\.[^/.]+$/, ""); // Remove file extension

    await cloudinary.uploader.destroy(publicId);
  }

  await db.profile.update({
    where: { userId },
    data: { avatar: null },
  });
};
