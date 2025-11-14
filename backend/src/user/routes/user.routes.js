import { Router } from "express";
import { authenticate } from "#shared/middlewares/auth.middleware.js";
import upload from "#shared/middlewares/multer.middleware.js";
import * as userController from "../controllers/user.controller.js";
import { avatarUploadLimiter } from "#shared/middlewares/rate-limiter.middleware.js";

export const userRoutes = Router();

userRoutes.get("/", authenticate, userController.getUser);
userRoutes.get("/referrals", authenticate, userController.getReferrals);
userRoutes.patch(
  "/claim-daily-reward",
  authenticate,
  userController.claimDailyReward
);

userRoutes.patch("/", authenticate, userController.updateProfile);
userRoutes.patch(
  "/avatar",
  authenticate,
  avatarUploadLimiter,
  upload.single("avatar"),
  userController.uploadAvatar
);
userRoutes.delete("/avatar", authenticate, userController.deleteAvatar);
