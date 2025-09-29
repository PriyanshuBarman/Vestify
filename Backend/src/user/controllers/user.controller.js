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
