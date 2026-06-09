import { authenticate } from "#shared/middlewares/auth.middleware.js";
import { Router } from "express";
import * as communityController from "../controllers/community.controller.js";

export const communityRoutes = Router();

communityRoutes.use(authenticate);

communityRoutes.get("/users", communityController.getUsers);
communityRoutes.get("/search", communityController.searchUsers);
communityRoutes.get("/users/:username", communityController.getUserProfile);
communityRoutes.get(
  "/users/:username/portfolio",
  communityController.getPortfolio,
);
communityRoutes.get(
  "/users/:username/portfolio/summary",
  communityController.getPortfolioSummary,
);
communityRoutes.get(
  "/users/:username/portfolio/:schemeCode/orders",
  communityController.getFundOrders,
);
communityRoutes.get(
  "/users/:username/orders",
  communityController.getAllOrders,
);
communityRoutes.get("/orders/:orderId", communityController.getOrderDetail);
communityRoutes.get("/users/:username/sips", communityController.getSips);
communityRoutes.get(
  "/users/:username/sips/:sipId",
  communityController.getSipDetail,
);
communityRoutes.get(
  "/users/:username/watchlist",
  communityController.getWatchlist,
);
