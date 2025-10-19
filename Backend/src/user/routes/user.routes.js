import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.get("/", authenticate, userController.getMe);
userRoutes.patch(
  "/claim-daily-reward",
  authenticate,
  userController.claimDailyReward
);

userRoutes.patch("/set-pin", authenticate, userController.setPin);
userRoutes.patch("/change-pin", authenticate, userController.changePin);

userRoutes.patch(
  "/change-password",
  authenticate,
  userController.changePassword
);
userRoutes.post(
  "/change-email",
  authenticate,
  userController.requestEmailChange
);
userRoutes.patch(
  "/change-email/:otp",
  authenticate,
  userController.verifyEmailChange
);
