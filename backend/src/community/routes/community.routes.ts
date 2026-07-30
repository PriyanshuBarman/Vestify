import { validate } from "@/shared/middlewares/validate.middleware.js";
import { Router } from "express";
import * as communityController from "../controllers/community.controller.js";
import {
  getUsersSchema,
  searchUsersSchema,
  usernameParamsSchema,
} from "../schemas/community.schema.js";

export const coreCommunityRoutes = Router();

coreCommunityRoutes.get(
  "/users",
  validate(getUsersSchema),
  communityController.getUsers,
);
coreCommunityRoutes.get(
  "/search",
  validate(searchUsersSchema),
  communityController.searchUsers,
);
coreCommunityRoutes.get(
  "/users/:username",
  validate(usernameParamsSchema),
  communityController.getUserProfile,
);
