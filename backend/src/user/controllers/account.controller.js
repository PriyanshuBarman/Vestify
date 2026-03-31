import * as accountService from "../services/account.service.js";

export const deleteAccount = async (req, res) => {
  const { userId } = req.user;

  await accountService.deleteAccount(userId);

  return res
    .status(200)
    .json({ success: true, message: "Account Deleted Successfully" });
};

export const setPin = async (req, res) => {
  const { userId } = req.user;
  const { pin } = req.body;

  await accountService.setPin(userId, pin);

  return res
    .status(200)
    .json({ success: true, message: "Pin Setup Successful" });
};

export const changePin = async (req, res) => {
  const { userId } = req.user;
  const { currentPin, newPin } = req.body;

  await accountService.changePin(userId, currentPin, newPin);

  return res
    .status(200)
    .json({ success: true, message: "Pin Reset Successful" });
};

export const changePassword = async (req, res) => {
  const { userId } = req.user;
  const { currentPassword, newPassword } = req.body;

  await accountService.changePassword(userId, currentPassword, newPassword);

  return res
    .status(200)
    .json({ success: true, message: "Password changed successfully" });
};

export const requestEmailChange = async (req, res) => {
  const { userId } = req.user;
  const { password, newEmail } = req.body;

  await accountService.requestEmailChange(userId, password, newEmail);

  return res
    .status(200)
    .json({ success: true, message: "OTP sent to your new email" });
};

export const verifyEmailChange = async (req, res) => {
  const { userId } = req.user;
  const { otp } = req.params;

  await accountService.verifyEmailChange(userId, otp);

  return res
    .status(200)
    .json({ success: true, message: "Email Changed Successfully" });
};
