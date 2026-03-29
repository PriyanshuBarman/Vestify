import { Router } from "express";
import * as accountController from "../controllers/account.controller.js";
import {
  pinChangeLimiter,
  passwordChangeLimiter,
  emailChangeLimiter,
} from "#shared/middlewares/rate-limiter.middleware.js";
import { validate } from "#shared/middlewares/validate.middleware.js";
import {
  setPinSchema,
  changePinSchema,
  changePasswordSchema,
  requestEmailChangeSchema,
  verifyEmailChangeSchema,
} from "../schemas/account.schema.js";

export const accountRoutes = Router();

accountRoutes.patch(
  "/set-pin",
  validate(setPinSchema),
  accountController.setPin,
);
accountRoutes.patch(
  "/change-pin",
  validate(changePinSchema),
  pinChangeLimiter,
  accountController.changePin,
);

accountRoutes.patch(
  "/change-password",
  validate(changePasswordSchema),
  passwordChangeLimiter,
  accountController.changePassword,
);
accountRoutes.post(
  "/change-email",
  validate(requestEmailChangeSchema),
  emailChangeLimiter,
  accountController.requestEmailChange,
);
accountRoutes.patch(
  "/change-email/:otp",
  validate(verifyEmailChangeSchema),
  accountController.verifyEmailChange,
);

accountRoutes.delete("/", accountController.deleteAccount);
