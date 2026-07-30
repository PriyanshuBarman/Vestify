import { Router } from "express";
import * as landingController from "../controllers/public-api.controller.js";

export const publicRoutes = Router();

publicRoutes.get("/screenshots", landingController.getScreenshots);
publicRoutes.get("/users-count", landingController.getUserCount);
