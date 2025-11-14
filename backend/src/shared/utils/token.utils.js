import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "#config/env.config.js";

export const generateTokens = (userId, sessionId) => {
  const refreshToken = jwt.sign({ sessionId }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
  });

  const accessToken = jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
  });

  return { refreshToken, accessToken };
};

export const generateTokenHash = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
