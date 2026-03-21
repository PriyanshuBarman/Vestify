import { Router } from "express";
import * as profileController from "../controllers/profile.controller.js";

export const profileRoutes = Router();

profileRoutes.get("/:userId", profileController.getProfile);
profileRoutes.get("/", profileController.searchProfile);
