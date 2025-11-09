import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as profileController from "../controllers/profile.controller.js";

export const profileRoutes = Router();

profileRoutes.get("/:userId", authenticate, profileController.getProfile);
profileRoutes.get("/", authenticate, profileController.searchProfile);
