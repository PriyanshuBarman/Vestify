import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../shared/utils/apiError.utils.js";
import crypto from "crypto";
import { db } from "../../../config/db.config.js";
import { JWT_SECRET } from "../../../config/env.config.js";
import { TOKEN_EXPIRY } from "../constants/auth.constants.js";
import { sendEmail } from "../../shared/services/email.service.js";
import { passwordResetTemplate } from "../../shared/utils/emailTemplates.js";

export const signupUser = async (name, email, password) => {
  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) throw new ApiError(400, "User Already Exists");

  const hashPassword = await bcrypt.hash(password, 10);
  const username = await generateUniqueUsername(name);

  const user = await db.user.create({
    data: {
      email,
      password: hashPassword,
      profile: {
        create: {
          name,
          username,
        },
      },
    },
  });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return { token, user };
};

export const loginUser = async (email, password) => {
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser) throw new ApiError(400, "Email or password is invalid");

  const match = await bcrypt.compare(password, existingUser.password);

  if (!match) throw new ApiError(400, "Email or password is invalid");

  const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return { token, user: existingUser };
};

export async function generateUniqueUsername(name) {
  const base = name.toLowerCase().replace(/\s+/g, "");
  let username = base;

  // First check if base username is available
  const exists = await db.profile.findUnique({
    where: { username },
  });

  if (!exists) return username;

  // Keep generating until we find a available username
  while (true) {
    // Generate 5 random candidates/usernames in a batch
    const candidates = Array.from(
      { length: 5 },
      () => base + crypto.randomInt(1, 1000) // 4-digit random
    );

    // Fetch all usernames that already exist from this batch
    const taken = await db.profile.findMany({
      where: { username: { in: candidates } },
      select: {
        username: true,
      },
    });

    // Find the first candidate not taken
    const available = candidates.find(
      (u) => !taken.some((t) => t.username === u)
    );

    if (available) {
      return available;
    }

    // If all taken, loop again and try another batch
  }
}

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
