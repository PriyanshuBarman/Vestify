import { asyncHandler } from "#shared/utils/async-handler.utils.js";
import * as accountService from "../services/account.service.js";

export const deleteAccount = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  await accountService.deleteAccount(userId);

  return res
    .status(200)
    .json({ success: true, message: "Account Deleted Successfully" });
});

export const setPin = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { pin } = req.body;

  await accountService.setPin(userId, pin);

  return res
    .status(200)
    .json({ success: true, message: "Pin Setup Successful" });
});

export const changePin = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { currentPin, newPin } = req.body;

  await accountService.changePin(userId, currentPin, newPin);

  return res
    .status(200)
    .json({ success: true, message: "Pin Reset Successful" });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { currentPassword, newPassword } = req.body;

  await accountService.changePassword(userId, currentPassword, newPassword);

  return res
    .status(200)
    .json({ success: true, message: "Password changed successfully" });
});

export const requestEmailChange = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { password, newEmail } = req.body;

  await accountService.requestEmailChange(userId, password, newEmail);

  return res
    .status(200)
    .json({ success: true, message: "OTP sent to your new email" });
});

export const verifyEmailChange = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { otp } = req.params;

  await accountService.verifyEmailChange(userId, otp);

  return res
    .status(200)
    .json({ success: true, message: "Email Changed Successfully" });
});
