import { authenticate } from "@/shared/middlewares/auth.middleware.js";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import { Router } from "express";
import { orderIdParamSchema } from "../../mutual-fund/schemas/order.schema.js";
import * as communityController from "../controllers/community.controller.js";
import {
  getPortfolioSchema,
  getUsersSchema,
  searchUsersSchema,
  usernameParamsSchema,
} from "../schemas/user.schema.js";
import { sipIdParamSchema } from "../../mutual-fund/schemas/sip.schema.js";

export const communityRoutes = Router();

communityRoutes.use(authenticate);

communityRoutes.get(
  "/users",
  validate(getUsersSchema),
  communityController.getUsers,
);
communityRoutes.get(
  "/search",
  validate(searchUsersSchema),
  communityController.searchUsers,
);
communityRoutes.get(
  "/users/:username",
  validate(usernameParamsSchema),
  communityController.getUserProfile,
);
communityRoutes.get(
  "/users/:username/portfolio",
  validate(getPortfolioSchema),
  communityController.getPortfolio,
);
communityRoutes.get(
  "/users/:username/portfolio/summary",
  validate(usernameParamsSchema),
  communityController.getPortfolioSummary,
);
communityRoutes.get(
  "/users/:username/portfolio/:schemeCode/orders",
  validate(usernameParamsSchema),
  communityController.getFundOrders,
);
communityRoutes.get(
  "/users/:username/orders",
  validate(usernameParamsSchema),
  communityController.getAllOrders,
);
communityRoutes.get(
  "/orders/:orderId",
  validate(orderIdParamSchema),
  communityController.getOrderDetail,
);
communityRoutes.get("/users/:username/sips", communityController.getSips);
communityRoutes.get(
  "/users/:username/sips/:sipId",
  validate(sipIdParamSchema),
  communityController.getSipDetail,
);
communityRoutes.get(
  "/users/:username/watchlist",
  validate(usernameParamsSchema),
  communityController.getWatchlist,
);
