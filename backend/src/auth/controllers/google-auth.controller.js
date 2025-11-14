import { OAuth2Client } from "google-auth-library";
import config from "#config/env.config.js";
import * as gAuthService from "../services/google-auth.service.js";
import { asyncHandler } from "#shared/utils/async-handler.utils.js";
import {
  ACCESS_COOKIE_OPTIONS,
  REFRESH_COOKIE_OPTIONS,
} from "../constants/auth.constants.js";

const client = new OAuth2Client(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  "postmessage"
);

export const googleAuth = asyncHandler(async (req, res) => {
  const { code, referralCode } = req.body;
  const ip = req.clientIp;
  const userAgent = req.headers["user-agent"];

  const { tokens } = await client.getToken(code);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: config.CLIENT_ID,
  });

  const { email, name, picture } = ticket.getPayload();

  const { accessToken, refreshToken, user, isNewUser } =
    await gAuthService.googleAuth({
      email,
      name,
      picture,
      ip,
      userAgent,
      referralCode,
    });

  return res
    .cookie("accessToken", accessToken, ACCESS_COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS)
    .status(isNewUser ? 201 : 200)
    .json({
      success: true,
      message: isNewUser ? "User Registered Successfully" : "Login Successful",
      user,
    });
});
