import { Router } from "express";
import * as landingController from "../controllers/landing.controller.js";

export const landingRoutes = Router();

landingRoutes.get("/screenshots", landingController.getScreenshots);
landingRoutes.get("/users-count", landingController.getUserCount);
