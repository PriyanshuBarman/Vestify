import jwt from "jsonwebtoken";
import { db } from "../../../config/db.config.js";
import { JWT_SECRET } from "../../../config/env.config.js";

export const getActiveSessions = async (userId) => {
  return await db.session.findMany({
    where: { userId },
    omit: { refreshTokenHash: true },
  });
};

export const revokeSession = async (sessionId) => {
  return await db.session.delete({
    where: {
      id: sessionId,
    },
  });
};

export const revokeAllSessions = async (userId, refreshToken) => {
  const decoded = jwt.verify(refreshToken, JWT_SECRET);

  return await db.session.deleteMany({
    where: {
      userId,
      id: { not: decoded.sessionId },
    },
  });
};
