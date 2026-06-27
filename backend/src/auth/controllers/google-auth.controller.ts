import { envConfig } from "@/config/env.config.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import type { Request, Response } from "express";

import { OAuth2Client } from "google-auth-library";
import {
  ACCESS_COOKIE_OPTIONS,
  REFRESH_COOKIE_OPTIONS,
} from "../constants/auth.constants.js";
import * as gAuthService from "../services/google-auth.service.js";

const client = new OAuth2Client(
  envConfig.CLIENT_ID,
  envConfig.CLIENT_SECRET,
  "postmessage",
);

export const googleAuth = async (req: Request, res: Response) => {
  const { code, referralCode } = req.body;
  const ip = req.clientIp ?? "unknown";
  const userAgent = req.headers["user-agent"] ?? "unknown";

  const { tokens } = await client.getToken(code);

  if (!tokens.id_token) {
    throw new ApiError(400, "Failed to obtain Google ID token");
  }

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: envConfig.CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new ApiError(400, "Failed to get user info from Google");
  }

  const { email, name, picture } = payload;

  if (!email || !name || !picture) {
    throw new ApiError(400, "Google account is missing required information");
  }

  const { accessToken, refreshToken, user, isNewUser } =
    await gAuthService.googleAuth({
      email,
      name,
      picture,
      ip,
      userAgent,
      referralCode,
    });

  res
    .cookie("accessToken", accessToken, ACCESS_COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS)
    .status(isNewUser ? 201 : 200)
    .json({
      success: true,
      message: isNewUser ? "User Registered Successfully" : "Login Successful",
      user,
    });
};
