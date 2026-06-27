import type { ApiRequest } from "@/shared/types/types.js";
import type { Request, Response } from "express";
import type {
  ChangePasswordSchema,
  ChangePinSchema,
  RequestEmailChangeSchema,
  SetPinSchema,
  VerifyEmailChangeSchema,
} from "../schemas/account.schema.js";
import * as accountService from "../services/account.service.js";

export const deleteAccount = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  await accountService.deleteAccount(userId);

  res
    .status(200)
    .json({ success: true, message: "Account Deleted Successfully" });
};

export const setPin = async (req: ApiRequest<SetPinSchema>, res: Response) => {
  const { userId } = req.user!;
  const { pin } = req.body;

  await accountService.setPin(userId, pin);

  res.status(200).json({ success: true, message: "Pin Setup Successful" });
};

export const changePin = async (
  req: ApiRequest<ChangePinSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { currentPin, newPin } = req.body;

  await accountService.changePin(userId, currentPin, newPin);

  res.status(200).json({ success: true, message: "Pin Reset Successful" });
};

export const changePassword = async (
  req: ApiRequest<ChangePasswordSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { currentPassword, newPassword } = req.body;

  await accountService.changePassword(userId, currentPassword, newPassword);

  res
    .status(200)
    .json({ success: true, message: "Password changed successfully" });
};

export const requestEmailChange = async (
  req: ApiRequest<RequestEmailChangeSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { password, newEmail } = req.body;

  await accountService.requestEmailChange(userId, password, newEmail);

  res
    .status(200)
    .json({ success: true, message: "OTP sent to your new email" });
};

export const verifyEmailChange = async (
  req: ApiRequest<{}, VerifyEmailChangeSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { otp } = req.params;

  await accountService.verifyEmailChange(userId, otp);

  res
    .status(200)
    .json({ success: true, message: "Email Changed Successfully" });
};
