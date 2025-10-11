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

export const updateProfile = async (userId, name, username) => {
  const profile = await db.profile.update({
    where: { userId },
    data: { name, username },
  });

  return profile;
};

export const uploadProfilePhoto = async (userId, file) => {
  const fileBuffer = file.buffer;
  try {
    await deleteProfilePhoto(userId); // delete old image

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "Vestify-User-Avatars",
          resource_type: "auto",
          allowed_formats: ["png", "jpg", "jpeg", "webp"],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(fileBuffer);
    });

    const profile = await db.profile.update({
      where: { userId },
      data: { avatar: result.secure_url },
    });

    return profile.avatar;
  } catch (error) {
    throw new ApiError(
      error?.http_code || 500,
      error?.message || "Internal server error"
    );
  }
};

export const deleteProfilePhoto = async (userId) => {
  const profile = await db.profile.findUnique({
    where: { userId },
    select: { avatar: true },
  });

  // Only delete from Cloudinary if the avatar is stored there
  // (not for null avatars or Google OAuth profile images)
  if (profile?.avatar?.startsWith("https://res.cloudinary.com/")) {
    const publicId = profile.avatar
      .split("/")
      .slice(-2) // Get last two parts
      .join("/") // Join them with a slash
      .replace(/\.[^/.]+$/, ""); // Remove file extension

    await cloudinary.uploader.destroy(publicId);
  }

  await db.profile.update({
    where: { userId },
    data: { avatar: null },
  });
};
