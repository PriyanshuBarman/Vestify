import config from "#config/env.config.js";
import { asyncHandler } from "#shared/utils/async-handler.utils.js";
import * as userService from "../services/user.service.js";

export const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const user = await userService.getUser(userId);

  return res.status(200).json({ success: true, user });
});

export const getReferrals = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const referrals = await userService.getReferrals(userId);

  return res.status(200).json({ success: true, referrals });
});

export const claimDailyReward = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const rewardAmount = Number(config.DAILY_REWARD_AMOUNT);

  const updatedBalance = await userService.claimDailyReward(
    userId,
    rewardAmount
  );

  return res.status(200).json({
    success: true,
    message: `₹${rewardAmount} reward has been added`,
    updatedBalance,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { name, username } = req.body;

  const profile = await userService.updateProfile(userId, name, username);

  return res.status(200).json({ success: true, profile });
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { file } = req;

  if (!file) {
    throw new ApiError(400, "Please uploade a file");
  }

  const avatar = await userService.uploadAvatar(userId, file);

  return res
    .status(200)
    .json({ success: true, message: "Avatar uploaded successfully", avatar });
});

export const deleteAvatar = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const avatar = await userService.deleteAvatar(userId);

  return res
    .status(200)
    .json({ success: true, message: "Avatar deleted successfully", avatar });
});
