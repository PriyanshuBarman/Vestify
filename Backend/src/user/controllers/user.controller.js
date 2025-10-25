import { ApiError } from "../../shared/utils/apiError.utils.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as userService from "../services/user.service.js";

export const getMe = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const user = await userService.getMe(userId);

  return res.status(200).json({ success: true, user });
});

export const claimDailyReward = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const updatedBalance = await userService.claimDailyReward(userId);

  return res.status(200).json({
    success: true,
    message: "₹1000 reward has been added",
    updatedBalance,
  });
});

export const setPin = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { pin } = req.body;

  if (!pin) {
    throw new ApiError(400, "pin is required");
  }
  if (pin.toString().length !== 4) {
    throw new ApiError(400, "pin must be 4 digits");
  }

  await userService.setPin(userId, pin);

  return res
    .status(200)
    .json({ success: true, message: "Pin Setup Successful" });
});

export const changePin = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { currentPin, newPin } = req.body;

  if (!currentPin) {
    throw new ApiError(400, "currentPin is required");
  }
  if (!newPin) {
    throw new ApiError(400, "newPin is required");
  }
  if (newPin.toString().length !== 4) {
    throw new ApiError(400, "newPin must be 4 digits");
  }

  await userService.changePin(userId, currentPin, newPin);

  return res
    .status(200)
    .json({ success: true, message: "Pin Reset Successful" });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword) throw new ApiError(400, "currentPassword is required");
  if (!newPassword) throw new ApiError(400, "newPassword is required");

  await userService.changePassword(userId, currentPassword, newPassword);

  return res
    .status(200)
    .json({ success: true, message: "Password changed successfully" });
});

export const requestEmailChange = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { password, newEmail } = req.body;

  if (!password) {
    throw new ApiError(400, "password is required");
  }
  if (!newEmail) {
    throw new ApiError(400, "newEmail is required");
  }

  await userService.requestEmailChange(userId, password, newEmail);

  return res
    .status(200)
    .json({ success: true, message: "OTP sent to your new email" });
});

export const verifyEmailChange = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { otp } = req.params;

  if (!otp) {
    throw new ApiError(400, "OTP is required");
  }

  await userService.verifyEmailChange(userId, otp);

  return res
    .status(200)
    .json({ success: true, message: "Email Changed Successfully" });
});
