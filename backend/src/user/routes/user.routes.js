import { Router } from "express";
import upload from "#shared/middlewares/multer.middleware.js";
import * as userController from "../controllers/user.controller.js";
import { avatarUploadLimiter } from "#shared/middlewares/rate-limiter.middleware.js";

export const userRoutes = Router();

userRoutes.get("/", userController.getUser);
userRoutes.get("/referrals", userController.getReferrals);
userRoutes.patch("/claim-daily-reward", userController.claimDailyReward);

userRoutes.patch("/", userController.updateProfile);
userRoutes.patch(
  "/avatar",
  avatarUploadLimiter,
  upload.single("avatar"),
  userController.uploadAvatar,
);
userRoutes.delete("/avatar", userController.deleteAvatar);
