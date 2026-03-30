import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import db from "#config/db.config.js";
import envConfig from "#config/env.config.js";
import * as referralService from "./referral.service.js";
import { generateUniqueUsername } from "#shared/services/username.service.js";
import { ApiError } from "#shared/utils/api-error.utils.js";
import {
  generateTokenHash,
  generateTokens,
} from "#shared/utils/token.utils.js";

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

  const referrer = await referralService.validateReferral(ip, referralCode);

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
  if (user.authProvider === "GOOGLE") {
    throw new ApiError(
      400,
      "This account was created with Google. Please use Google Login.",
    );
  }

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
  const decoded = jwt.verify(refreshToken, envConfig.REFRESH_TOKEN_SECRET);
  const refreshTokenHash = generateTokenHash(refreshToken);

  await db.session.deleteMany({
    where: {
      id: decoded.sessionId,
      refreshTokenHash,
    },
  });
};

export const refreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, envConfig.REFRESH_TOKEN_SECRET);
    const refreshTokenHash = generateTokenHash(token);

    const session = await db.session.findFirst({
      where: {
        id: decoded.sessionId,
        refreshTokenHash,
      },
      include: { user: true },
    });

    if (!session) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const newTokens = generateTokens(session.user.id, session.id);
    const newRefreshTokenHash = generateTokenHash(newTokens.refreshToken);

    await db.session.update({
      where: {
        id: session.id,
        refreshTokenHash,
      },
      data: {
        refreshTokenHash: newRefreshTokenHash,
      },
    });

    return newTokens;
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }
};
