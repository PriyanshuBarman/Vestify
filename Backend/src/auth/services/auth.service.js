import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../config/db.config.js";
import { JWT_SECRET, OWNER_EMAIL } from "../../../config/env.config.js";
import { sendEmail } from "../../shared/services/email.service.js";
import { generateUniqueUsername } from "../../shared/services/usernameGenerator.service.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";
import { refreshTokenReuseTemplate } from "../../shared/utils/emailTemplates.js";
import {
  generateTokenHash,
  generateTokens,
} from "../../shared/utils/token.utils.js";
import * as referralService from "./referral.service.js";

export const signupUser = async ({
  name,
  email,
  password,
  userAgent,
  ip,
  referralCode,
}) => {
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) throw new ApiError(400, "User Already Exists");

  // Check if referralCode is valid or not
  let referrer;
  if (referralCode) {
    referrer = await db.profile.findUnique({
      where: { username: referralCode },
    });

    if (!referrer) throw new ApiError(400, "Invalid referral code");
  }

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
    select: {
      id: true,
      email: true,
      hasPin: true,
      createdAt: true,
      authProvider: true,
      profile: true,
    },
  });

  const sessionId = uuidv4();
  const { refreshToken, accessToken } = generateTokens(user.id, sessionId);
  const refreshTokenHash = generateTokenHash(refreshToken);
  await db.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      ip,
      userAgent,
      refreshTokenHash,
    },
  });

  if (referrer) {
    await referralService.applyReferralBonus(referrer.userId, user.id);
  }

  return { refreshToken, accessToken, user };
};

export const loginUser = async ({ email, password, userAgent, ip }) => {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      hasPin: true,
      password: true,
      createdAt: true,
      authProvider: true,
      profile: true,
    },
  });

  if (!user) throw new ApiError(400, "Email or password is invalid");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new ApiError(400, "Email or password is invalid");

  const sessionId = uuidv4();
  const { refreshToken, accessToken } = generateTokens(user.id, sessionId);
  const refreshTokenHash = generateTokenHash(refreshToken);

  await db.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      ip,
      userAgent,
      refreshTokenHash,
    },
  });

  delete user.password;
  return { refreshToken, accessToken, user };
};

export const logoutUser = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, JWT_SECRET);
  await db.session.deleteMany({
    where: {
      id: decoded.sessionId,
    },
  });
};

export const refreshToken = async (token, userAgent, ip) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const session = await db.session.findUnique({
      where: {
        id: decoded.sessionId,
      },
      include: { user: true },
    });

    if (!session) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const tokenHash = generateTokenHash(token);

    // REUSE DETECTED
    if (session.refreshTokenHash !== tokenHash) {
      // Revoke the session
      await db.session.deleteMany({
        where: { id: decoded.sessionId },
      });

      // Notify owner
      await sendEmail({
        to: OWNER_EMAIL,
        subject: "REUSE DETECTED",
        html: refreshTokenReuseTemplate(session, decoded, userAgent, ip),
      });

      throw new ApiError(401, "Invalid refresh token");
    }

    // Generate new tokens
    const newTokens = generateTokens(session.user.id, session.id);
    const refreshTokenHash = generateTokenHash(newTokens.refreshToken);

    // Update TokenHash in DB
    await db.session.update({
      where: {
        id: session.id,
      },
      data: {
        refreshTokenHash,
      },
    });

    return newTokens;
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
};
