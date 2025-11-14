import {
  loginLimiter,
  forgotPasswordLimiter,
  passwordChangeLimiter,
  refreshTokenLimiter,
  signUpLimiter,
} from "#shared/middlewares/rate-limiter.middleware.js";
import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as gAuthController from "../controllers/google-auth.controller.js";
import * as passwordController from "../controllers/password.controller.js";
import {
  loginValidator,
  signupValidator,
} from "../validators/auth.validator.js";

export const authRoutes = Router();

authRoutes.post("/google", gAuthController.googleAuth);

authRoutes.post(
  "/signup",
  signupValidator,
  signUpLimiter,
  authController.signup
);
authRoutes.post("/login", loginValidator, loginLimiter, authController.login);
authRoutes.get("/logout", authController.logout);
authRoutes.post(
  "/refresh-token",
  refreshTokenLimiter,
  authController.refreshToken
);

authRoutes.post(
  "/forgot-password",
  forgotPasswordLimiter,
  passwordController.forgotPassword
);
authRoutes.post(
  "/reset-password/:token",
  passwordChangeLimiter,
  passwordController.resetPassword
);
