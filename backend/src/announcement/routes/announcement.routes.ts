import { Router } from "express";
import {
  dismissAnnouncement,
  getAnnouncements,
} from "../controllers/announcement.controller.js";
import { authenticate } from "@/shared/middlewares/auth.middleware.js";

export const announcementRoutes = Router();

announcementRoutes.use(authenticate);

announcementRoutes.get("/announcements", getAnnouncements);
announcementRoutes.post(
  "/announcements/:announcementId/dismiss",
  dismissAnnouncement,
);
