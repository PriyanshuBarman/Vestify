import bcrypt from "bcrypt";
import { db } from "../../../config/db.config.js";
import { sendEmail } from "../../shared/services/email.service.js";
import { ApiError } from "../../shared/utils/api-error.utils.js";
import { changeEmailTemplate } from "../../shared/utils/email-templates.js";
import { generateOtp } from "../utils/generate-otp.utils.js";

export const deleteAccount = async (userId) => {
  await db.user.delete({
    where: { id: userId },
  });
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
  const updatePassword = db.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashPassword,
    },
  });
  const clearAllSessions = db.session.deleteMany({
    where: { userId },
  });

  await db.$transaction([updatePassword, clearAllSessions]);
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
