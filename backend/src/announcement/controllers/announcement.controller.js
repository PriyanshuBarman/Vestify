import db from "#config/db.config.js";
import { ApiError } from "#shared/utils/api-error.utils.js";

export const getAnnouncements = async (req, res) => {
  const { userId } = req.user;

  const announcements = await db.announcement.findMany({
    where: {
      dismissals: {
        none: { userId },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json({ success: true, announcements });
};

export const dismissAnnouncement = async (req, res) => {
  const { userId } = req.user;
  const { announcementId } = req.params;

  const announcement = await db.announcement.findUnique({
    where: { id: announcementId },
  });

  if (!announcement) {
    throw new ApiError(404, "Announcement not found");
  }

  const existingDismissal = await db.announcementDismissal.findUnique({
    where: {
      userId_announcementId: {
        userId,
        announcementId,
      },
    },
  });

  if (existingDismissal) {
    throw new ApiError(400, "Announcement already dismissed");
  }

  await db.announcementDismissal.create({
    data: {
      userId,
      announcementId,
    },
  });
  return res
    .status(200)
    .json({ success: true, message: "Announcement dismissed" });
};
