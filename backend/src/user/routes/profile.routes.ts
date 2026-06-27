import { validate } from "@/shared/middlewares/validate.middleware.js";
import { Router } from "express";
import * as profileController from "../controllers/profile.controller.js";
import {
  searchProfileSchema,
  userIdParamsSchema,
} from "../schemas/profile.schema.js";

export const profileRoutes = Router();

profileRoutes.get(
  "/:userId",
  validate(userIdParamsSchema),
  profileController.getProfile,
);
profileRoutes.get(
  "/",
  validate(searchProfileSchema),
  profileController.searchProfile,
);
