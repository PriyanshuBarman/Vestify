import { v4 as uuidv4 } from "uuid";
import { db } from "../../../config/db.config.js";
import { generateUniqueUsername } from "../../shared/services/usernameGenerator.service.js";
import {
  generateTokenHash,
  generateTokens,
} from "../../shared/utils/token.utils.js";

export const googleAuth = async ({ email, name, picture, ip, userAgent }) => {
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
