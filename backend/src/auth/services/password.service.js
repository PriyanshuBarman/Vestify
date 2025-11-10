import bcrypt from "bcrypt";
import crypto from "crypto";
import { db } from "#config/db.config.js";
import { sendEmail } from "#shared/services/email.service.js";
import { ApiError } from "#shared/utils/api-error.utils.js";
import { passwordResetTemplate } from "#shared/utils/email-templates.js";

export const forgotPassword = async (email) => {
  const user = await db.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (!user) {
    throw new ApiError(404, "No account found with this email");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  await db.resetPasswordToken.upsert({
    where: { userId: user.id },
    update: { token: hashedToken, expiresAt, createdAt: new Date() },
    create: { token: hashedToken, expiresAt, userId: user.id },
  });

  await sendEmail({
    to: user.email,
    subject: "Password Reset Request",
    html: passwordResetTemplate(user.profile.name, token),
  });
};

export const verifyTokenAndResetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const record = await db.resetPasswordToken.findFirst({
    where: { token: hashedToken },
    include: { user: true },
  });

  if (!record || record.expiresAt < new Date()) {
    throw new ApiError(404, "Invalid or expired token");
  }

  await db.resetPasswordToken.delete({
    where: { id: record.id },
  });

  const hashPassword = await bcrypt.hash(newPassword, 10);
  await db.user.update({
    where: {
      id: record.userId,
    },
    data: {
      password: hashPassword,
    },
  });
};
