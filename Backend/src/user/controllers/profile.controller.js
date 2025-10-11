import { ApiError } from "../../shared/utils/apiError.utils.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as profileService from "../services/profile.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await profileService.fetchProfile(userId);

  return res.status(200).json({ success: true, profile });
});

export const searchProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { limit } = req.query;
  const { query } = req.query;

  const profiles = await profileService.searchProfile(userId, query, limit);

  return res.status(200).json({ success: true, profiles });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { name, username } = req.body;

  const profile = await profileService.updateProfile(userId, name, username);

  return res.status(200).json({ success: true, profile });
});

export const uploadProfilePhoto = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { file } = req;

  if (!file) {
    throw new ApiError(400, "Please uploade a file");
  }

  const avatar = await profileService.uploadProfilePhoto(userId, file);

  return res
    .status(200)
    .json({ success: true, message: "Avatar uploaded successfully", avatar });
});

export const deleteProfilePhoto = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const avatar = await profileService.deleteProfilePhoto(userId);

  return res
    .status(200)
    .json({ success: true, message: "Avatar deleted successfully", avatar });
});
