import cloudinary from "../../../config/cloudinary.config.js";
import { db } from "../../../config/db.config.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const fetchProfile = async (userId) => {
  const profile = await db.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};

export const searchProfile = async (userId, query, limit) => {
  return await db.profile.findMany({
    where: {
      userId: { not: userId },
      OR: [{ name: { contains: query } }, { username: { contains: query } }],
    },
    take: parseInt(limit || 8),
  });
};
