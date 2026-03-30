import jwt from "jsonwebtoken";
import crypto from "crypto";
import envConfig from "#config/env.config.js";

export const generateTokens = (userId, sessionId) => {
  const refreshToken = jwt.sign({ sessionId }, envConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: envConfig.REFRESH_TOKEN_EXPIRY,
  });

  const accessToken = jwt.sign({ userId }, envConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: envConfig.ACCESS_TOKEN_EXPIRY,
  });

  return { refreshToken, accessToken };
};

export const generateTokenHash = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
