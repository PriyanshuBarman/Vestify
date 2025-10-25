import { db } from "../../../config/db.config.js";

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

export const revokeAllSessions = async (userId) => {
  return await db.session.deleteMany({
    where: {
      userId,
    },
  });
};
