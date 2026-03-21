import { Router } from "express";
import * as communityController from "../controllers/community.controller.js";
import { authenticate } from "#shared/middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/users", communityController.getUsers);
router.get("/search", communityController.searchUsers);
router.get(
  "/users/:username",

  communityController.getUserProfile,
);
router.get(
  "/users/:username/portfolio",

  communityController.getPortfolio,
);
router.get(
  "/users/:username/portfolio/summary",

  communityController.getPortfolioSummary,
);
router.get(
  "/users/:username/orders",

  communityController.getAllOrders,
);
router.get(
  "/users/:username/portfolio/:schemeCode/orders",

  communityController.getFundOrders,
);
router.get("/users/:username/sips", communityController.getSips);
router.get(
  "/users/:username/sips/:sipId",

  communityController.getSipDetail,
);
router.get(
  "/users/:username/watchlist",

  communityController.getWatchlist,
);
router.get(
  "/orders/:orderId",

  communityController.getOrderDetail,
);

export const communityRoutes = router;
