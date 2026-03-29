import {
  forgotPasswordLimiter,
  loginLimiter,
  passwordChangeLimiter,
  refreshTokenLimiter,
  signUpLimiter,
} from "#shared/middlewares/rate-limiter.middleware.js";
import { validate } from "#shared/middlewares/validate.middleware.js";
import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as gAuthController from "../controllers/google-auth.controller.js";
import * as passwordController from "../controllers/password.controller.js";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";

export const authRoutes = Router();

authRoutes.post("/google", gAuthController.googleAuth);

authRoutes.post(
  "/signup",
  validate(signupSchema),
  signUpLimiter,
  authController.signup,
);
authRoutes.post(
  "/login",
  validate(loginSchema),
  loginLimiter,
  authController.login,
);
authRoutes.get("/logout", authController.logout);
authRoutes.post(
  "/refresh-token",
  refreshTokenLimiter,
  authController.refreshToken,
);

authRoutes.post(
  "/forgot-password",
  forgotPasswordLimiter,
  passwordController.forgotPassword,
);
authRoutes.post(
  "/reset-password/:token",
  passwordChangeLimiter,
  passwordController.resetPassword,
);
