import { db } from "@/config/db.config.js";
import { envConfig } from "@/config/env.config.js";
import jwt from "jsonwebtoken";

export const getActiveSessions = async (userId: string) => {
  await db.session.findMany({
    where: {
      userId,
    },
    omit: {
      refreshTokenHash: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const revokeSession = async (sessionId: string) => {
  await db.session.delete({
    where: {
      id: sessionId,
    },
  });
};

export const revokeAllSessions = async (
  userId: string,
  refreshToken: string,
) => {
  const decoded = jwt.verify(refreshToken, envConfig.REFRESH_TOKEN_SECRET) as {
    sessionId?: string;
  };

  if (!decoded.sessionId) {
    throw new Error("Invalid refresh token");
  }

  await db.session.deleteMany({
    where: {
      userId,
      id: { not: decoded.sessionId },
    },
  });
};
