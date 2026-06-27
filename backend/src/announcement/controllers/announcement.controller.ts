import { db } from "@/config/db.config.js";
import type { ApiRequest } from "@/shared/types/types.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import type { Request, Response } from "express";

export const getAnnouncements = async (req: Request, res: Response) => {
  const { userId } = req.user!;

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

  res.status(200).json({ success: true, announcements });
};

export const dismissAnnouncement = async (
  req: ApiRequest<{}, { announcementId: string }>,
  res: Response,
) => {
  const { userId } = req.user!;
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

  res.status(200).json({ success: true, message: "Announcement dismissed" });
};
