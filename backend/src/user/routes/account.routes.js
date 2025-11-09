import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as accountController from "../controllers/account.controller.js";

export const accountRoutes = Router();

accountRoutes.patch("/set-pin", authenticate, accountController.setPin);
accountRoutes.patch("/change-pin", authenticate, accountController.changePin);

accountRoutes.patch(
  "/change-password",
  authenticate,
  accountController.changePassword
);
accountRoutes.post(
  "/change-email",
  authenticate,
  accountController.requestEmailChange
);
accountRoutes.patch(
  "/change-email/:otp",
  authenticate,
  accountController.verifyEmailChange
);

accountRoutes.delete("/", authenticate, accountController.deleteAccount);
