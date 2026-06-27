import type { ApiRequest } from "@/shared/types/types.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import type { Response } from "express";
import type {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "../schemas/password.schema.js";
import * as passwordService from "../services/password.service.js";

export const forgotPassword = async (
  req: ApiRequest<ForgotPasswordSchema>,
  res: Response,
) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "email is required");
  const link = await passwordService.forgotPassword(email);

  res
    .status(200)
    .json({ success: true, message: "Reset link sent successfully", link });
};

export const resetPassword = async (
  req: ApiRequest<ResetPasswordSchema, { token: string }>,
  res: Response,
) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  await passwordService.verifyTokenAndResetPassword(token, newPassword);

  res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
};
