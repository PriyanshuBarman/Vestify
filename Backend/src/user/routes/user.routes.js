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

userRoutes.post("/pin", authenticate, userController.setPin); // set-pin
userRoutes.put("/pin", authenticate, userController.changePin); // update/change/reset-pin

userRoutes.put("/change-password", authenticate, userController.changePassword);
userRoutes.post(
  "/change-email",
  authenticate,
  userController.requestEmailChange
);
userRoutes.put(
  "/change-email/:otp",
  authenticate,
  userController.verifyEmailChange
);
