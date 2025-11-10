import { ApiError } from "#shared/utils/api-error.utils.js";
import { asyncHandler } from "#shared/utils/async-handler.utils.js";
import * as passwordService from "../services/password.service.js";

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "email is required");
  const link = await passwordService.forgotPassword(email);

  return res
    .status(200)
    .json({ success: true, message: "Reset link sent successfully", link });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token) throw new ApiError(400, "token is required");
  if (!newPassword) throw new ApiError(400, "newPassword is required");

  await passwordService.verifyTokenAndResetPassword(token, newPassword);

  return res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
});
