import { tz, TZDate } from "@date-fns/tz";
import bcrypt from "bcrypt";
import { isToday } from "date-fns";
import { db } from "../../../config/db.config.js";
import { sendUserEvent } from "../../shared/events/eventManager.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";
import { generateOtp } from "../utils/generateOtp.utils.js";
import { sendEmail } from "../../shared/services/email.service.js";
import { changeEmailTemplate } from "../../shared/utils/emailTemplates.js";

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

export const setPin = async (userId, pin) => {
  const hashPin = await bcrypt.hash(pin.toString(), 10);

  await db.user.update({
    where: { id: userId },
    data: {
      pin: hashPin,
      hasPin: true,
    },
  });
};

export const changePin = async (userId, currentPin, newPin) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { pin: true },
  });

  const isPinValid = await bcrypt.compare(currentPin.toString(), user.pin);
  if (!isPinValid) {
    throw new ApiError(400, "Current pin is incorrect");
  }

  const hashNewPin = await bcrypt.hash(newPin.toString(), 10);

  await db.user.update({
    where: { id: userId },
    data: {
      pin: hashNewPin,
    },
  });
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Current password is incorrect");
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashPassword,
    },
  });
};

export const requestEmailChange = async (userId, password, newEmail) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });

  if (user.email === newEmail) {
    throw new ApiError(
      400,
      "New email cannot be the same as the current email"
    );
  }

  const isPinValid = await bcrypt.compare(password.toString(), user.password);
  if (!isPinValid) {
    throw new ApiError(400, "Incorrect password");
  }

  const otp = generateOtp();
  const hashOtp = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await db.emailChangeRequest.upsert({
    where: { userId },
    create: {
      userId,
      newEmail,
      otpHash: hashOtp,
      expiresAt,
    },
    update: {
      newEmail,
      otpHash: hashOtp,
      expiresAt,
    },
  });

  await sendEmail({
    to: newEmail,
    subject: `${otp} - Email verification code`,
    html: changeEmailTemplate(user.profile.name, otp),
  });
};

export const verifyEmailChange = async (userId, otp) => {
  const record = await db.emailChangeRequest.findUnique({
    where: { userId },
  });

  if (!record || record.expiresAt < new Date()) {
    throw new ApiError(404, "Expired OTP");
  }

  const isOtpValid = await bcrypt.compare(otp.toString(), record.otpHash);
  if (!isOtpValid) {
    throw new ApiError(400, "Invalid OTP");
  }

  await db.user.update({
    where: { id: record.userId },
    data: { email: record.newEmail },
  });

  await db.emailChangeRequest.delete({
    where: { userId },
  });
};
