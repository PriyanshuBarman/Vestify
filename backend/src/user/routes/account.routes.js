import { Router } from "express";
import { authenticate } from "#shared/middlewares/auth.middleware.js";
import * as accountController from "../controllers/account.controller.js";
import {
  pinChangeLimiter,
  passwordChangeLimiter,
  emailChangeLimiter,
} from "#shared/middlewares/rate-limiter.middleware.js";

export const accountRoutes = Router();

accountRoutes.patch("/set-pin", authenticate, accountController.setPin);
accountRoutes.patch(
  "/change-pin",
  pinChangeLimiter,
  authenticate,
  accountController.changePin
);

accountRoutes.patch(
  "/change-password",
  passwordChangeLimiter,
  authenticate,
  accountController.changePassword
);
accountRoutes.post(
  "/change-email",
  emailChangeLimiter,
  authenticate,
  accountController.requestEmailChange
);
accountRoutes.patch(
  "/change-email/:otp",
  authenticate,
  accountController.verifyEmailChange
);

accountRoutes.delete("/", authenticate, accountController.deleteAccount);
