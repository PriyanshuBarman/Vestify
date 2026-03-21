import { Router } from "express";
import * as accountController from "../controllers/account.controller.js";
import {
  pinChangeLimiter,
  passwordChangeLimiter,
  emailChangeLimiter,
} from "#shared/middlewares/rate-limiter.middleware.js";

export const accountRoutes = Router();

accountRoutes.patch("/set-pin", accountController.setPin);
accountRoutes.patch(
  "/change-pin",
  pinChangeLimiter,
  accountController.changePin,
);

accountRoutes.patch(
  "/change-password",
  passwordChangeLimiter,
  accountController.changePassword,
);
accountRoutes.post(
  "/change-email",
  emailChangeLimiter,
  accountController.requestEmailChange,
);
accountRoutes.patch("/change-email/:otp", accountController.verifyEmailChange);

accountRoutes.delete("/", accountController.deleteAccount);
