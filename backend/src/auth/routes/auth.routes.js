import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as gAuthController from "../controllers/google-auth.controller.js";
import {
  loginValidator,
  signupValidator,
} from "../validators/auth.validator.js";
import * as passwordController from "../controllers/password.controller.js";

export const authRoutes = Router();

authRoutes.post("/google", gAuthController.googleAuth);

authRoutes.post("/signup", signupValidator, authController.signup);
authRoutes.post("/login", loginValidator, authController.login);
authRoutes.get("/logout", authController.logout);
authRoutes.post("/refresh-token", authController.refreshToken);

authRoutes.post("/forgot-password", passwordController.forgotPassword);
authRoutes.post("/reset-password/:token", passwordController.resetPassword);
