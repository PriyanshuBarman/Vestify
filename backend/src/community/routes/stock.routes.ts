import { validate } from "@/shared/middlewares/validate.middleware.js";
import { Router } from "express";
import { orderIdParamSchema } from "../../stock/schemas/order.schema.js";
import * as stockCommunityController from "../controllers/stock.controller.js";
import {
  getSingleStockHoldingsSchema,
  getSingleStockPortfolioSchema,
  getStockOrdersSchema,
  getStockPortfolioSchema,
  getStockWatchlistSchema,
} from "../schemas/stock.schema.js";

export const stockCommunityRoutes = Router({ mergeParams: true });

stockCommunityRoutes.get(
  "/portfolio",
  validate(getStockPortfolioSchema),
  stockCommunityController.getStockPortfolio,
);
stockCommunityRoutes.get(
  "/portfolio/:symbol",
  validate(getSingleStockPortfolioSchema),
  stockCommunityController.getSingleStockPortfolio,
);
stockCommunityRoutes.get(
  "/portfolio/:symbol/holdings",
  validate(getSingleStockHoldingsSchema),
  stockCommunityController.getSingleStockHoldings,
);
stockCommunityRoutes.get(
  "/orders",
  validate(getStockOrdersSchema),
  stockCommunityController.getAllStockOrders,
);
stockCommunityRoutes.get(
  "/orders/pending",
  validate(getStockOrdersSchema),
  stockCommunityController.getPendingStockOrders,
);
stockCommunityRoutes.get(
  "/orders/today",
  validate(getStockOrdersSchema),
  stockCommunityController.getTodayStockOrders,
);
stockCommunityRoutes.get(
  "/orders/:orderId",
  validate(orderIdParamSchema),
  stockCommunityController.getStockOrderDetail,
);
stockCommunityRoutes.get(
  "/watchlist",
  validate(getStockWatchlistSchema),
  stockCommunityController.getStockWatchlist,
);
