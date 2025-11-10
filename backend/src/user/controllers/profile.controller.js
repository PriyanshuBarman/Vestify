import { asyncHandler } from "#shared/utils/async-handler.utils.js";
import * as profileService from "../services/profile.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await profileService.getProfile(userId);

  return res.status(200).json({ success: true, profile });
});

export const searchProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { limit } = req.query;
  const { query } = req.query;

  const profiles = await profileService.searchProfile(userId, query, limit);

  return res.status(200).json({ success: true, profiles });
});
