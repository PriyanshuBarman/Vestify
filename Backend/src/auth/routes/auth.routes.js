import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { googleAuth } from "../controllers/googleAuth.controller.js";
import {
  loginValidator,
  signupValidator,
} from "../validators/auth.validator.js";

export const authRoutes = Router();

authRoutes.post("/google", googleAuth);

authRoutes.post("/signup", signupValidator, authController.signup);
authRoutes.post("/login", loginValidator, authController.login);
authRoutes.get("/logout", authController.logout);
authRoutes.post("/forgot-password", authController.forgotPassword);
authRoutes.post("/reset-password/:token", authController.resetPassword);
