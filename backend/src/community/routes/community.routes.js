import { Router } from "express";
import * as communityController from "../controllers/community.controller.js";
import { authenticate } from "#shared/middlewares/auth.middleware.js";

const router = Router();

router.get("/users", authenticate, communityController.getUsers);
router.get("/search", authenticate, communityController.searchUsers);
router.get(
  "/users/:username",
  authenticate,
  communityController.getUserProfile,
);
router.get(
  "/users/:username/portfolio",
  authenticate,
  communityController.getPortfolio,
);
router.get(
  "/users/:username/portfolio/:schemeCode/orders",
  authenticate,
  communityController.getFundOrders,
);
router.get("/users/:username/sips", authenticate, communityController.getSips);
router.get(
  "/users/:username/sips/:sipId",
  authenticate,
  communityController.getSipDetail,
);
router.get(
  "/users/:username/watchlist",
  authenticate,
  communityController.getWatchlist,
);
router.get(
  "/orders/:orderId",
  authenticate,
  communityController.getOrderDetail,
);

export const communityRoutes = router;
