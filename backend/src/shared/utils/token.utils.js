import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_SECRET } from "#config/env.config.js";

export const generateTokens = (userId, sessionId) => {
  const refreshToken = jwt.sign({ sessionId }, JWT_SECRET, {
    expiresIn: "30d",
  });

  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15m",
  });

  return { refreshToken, accessToken };
};

export const generateTokenHash = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
