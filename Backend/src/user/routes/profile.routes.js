import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as profileController from "../controllers/profile.controller.js";
import upload from "../../shared/middlewares/multer.middleware.js";

export const profileRoutes = Router();

profileRoutes.get("/:userId", authenticate, profileController.getProfile);
profileRoutes.get("/", authenticate, profileController.searchProfile);

profileRoutes.patch("/", authenticate, profileController.updateProfile);
profileRoutes.post(
  "/upload/avatar",
  authenticate,
  upload.single("avatar"),
  profileController.uploadProfilePhoto
);
profileRoutes.delete(
  "/avatar",
  authenticate,
  profileController.deleteProfilePhoto
);
