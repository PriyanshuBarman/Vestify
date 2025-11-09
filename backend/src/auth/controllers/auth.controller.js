import { NODE_ENV } from "../../../config/env.config.js";
import { ApiError } from "../../shared/utils/api-error.utils.js";
import { asyncHandler } from "../../shared/utils/async-handler.utils.js";
import * as authService from "../services/auth.service.js";
import {
  ACCESS_COOKIE_OPTIONS,
  REFRESH_COOKIE_OPTIONS,
} from "../constants/auth.constants.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, referralCode } = req.body;
  const userAgent = req.headers["user-agent"];
  const ip = req.clientIp;

  const { accessToken, refreshToken, user } = await authService.signupUser({
    name,
    email,
    password,
    userAgent,
    ip,
    referralCode,
  });

  return res
    .cookie("accessToken", accessToken, ACCESS_COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS)
    .status(201)
    .json({ success: true, message: "User Registration Successful", user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userAgent = req.headers["user-agent"];
  const ip = req.clientIp;

  const { accessToken, refreshToken, user } = await authService.loginUser({
    email,
    password,
    userAgent,
    ip,
  });

  return res
    .cookie("accessToken", accessToken, ACCESS_COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS)
    .status(200)
    .json({
      success: true,
      message: "User Logged In Successfully",
      user,
      refreshToken,
    });
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  await authService.logoutUser(refreshToken);

  const options = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "strict",
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json({ success: true, message: "User Logged Out Successfully" });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const userAgent = req.headers["user-agent"];
  const ip = req.clientIp;

  if (!refreshToken) throw new ApiError(403, "Refresh token is required");

  const newTokens = await authService.refreshToken(refreshToken, userAgent, ip);

  return res
    .cookie("accessToken", newTokens.accessToken, ACCESS_COOKIE_OPTIONS)
    .cookie("refreshToken", newTokens.refreshToken, REFRESH_COOKIE_OPTIONS)
    .status(200)
    .json({ success: true, message: "Tokens refreshed successfully" });
});
