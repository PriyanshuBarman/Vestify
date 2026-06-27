import { envConfig } from "@/config/env.config.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export function generateTokens(userId: string, sessionId: string) {
  const refreshToken = jwt.sign({ sessionId }, envConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: envConfig.REFRESH_TOKEN_EXPIRY as any,
  });

  const accessToken = jwt.sign({ userId }, envConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: envConfig.ACCESS_TOKEN_EXPIRY as any,
  });

  return { refreshToken, accessToken };
}

export function generateTokenHash(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
