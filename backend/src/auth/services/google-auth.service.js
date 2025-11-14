import db from "#config/db.config.js";
import { generateUniqueUsername } from "#shared/services/username.service.js";
import {
  generateTokenHash,
  generateTokens,
} from "#shared/utils/token.utils.js";
import { v4 as uuidv4 } from "uuid";
import * as referralService from "./referral.service.js";

export const googleAuth = async ({
  email,
  name,
  picture,
  ip,
  userAgent,
  referralCode,
}) => {
  let user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      hasPin: true,
      createdAt: true,
      authProvider: true,
      profile: true,
    },
  });

  let isNewUser = false;

  if (!user) {
    const referrer = await referralService.validateReferral(ip, referralCode);

    const username = await generateUniqueUsername(name);
    user = await db.user.create({
      data: {
        authProvider: "GOOGLE",
        email,
        profile: {
          create: {
            username,
            name,
            avatar: picture,
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

    if (referrer) {
      await referralService.applyReferralBonus(referrer.userId, user.id);
    }

    isNewUser = true;
  }

  const sessionId = uuidv4();
  const { accessToken, refreshToken } = generateTokens(user.id, sessionId);
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

  return { accessToken, refreshToken, user, isNewUser };
};
