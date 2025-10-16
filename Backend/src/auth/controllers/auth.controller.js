import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as authService from "../services/auth.service.js";
import { NODE_ENV } from "../../../config/env.config.js";
import { COOKIE_OPTIONS } from "../constants/auth.constants.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { token, user } = await authService.signupUser(name, email, password);

  return res
    .cookie("token", token, COOKIE_OPTIONS)
    .status(201)
    .json({ success: true, message: "User Regestration Sucessfull", user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await authService.loginUser(email, password);

  return res
    .cookie("token", token, COOKIE_OPTIONS)
    .status(200)
    .json({ success: true, message: "User Logged In Successfully", user });
});

export const logout = (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "strict",
    })
    .status(200)
    .json({ success: true, message: "User Logged Out Successfully" });
};

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const link = await authService.forgotPassword(email);

  return res
    .status(200)
    .json({ success: true, message: "Reset link sent successfully", link });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token) throw new ApiError(400, "token is required");
  if (!newPassword) throw new ApiError(400, "newPassword is required");

  await authService.verifyTokenAndResetPassword(token, newPassword);

  return res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
});
