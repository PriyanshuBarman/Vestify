import { validate } from "@/shared/middlewares/validate.middleware.js";
import { Router } from "express";
import { orderIdParamSchema } from "../../mutual-fund/schemas/order.schema.js";
import { sipIdParamSchema } from "../../mutual-fund/schemas/sip.schema.js";
import * as mutualFundCommunityController from "../controllers/mutual-fund.controller.js";
import {
  getFundOrdersSchema,
  getMutualFundPortfolioSchema,
  mutualFundUsernameParamsSchema,
} from "../schemas/mutual-fund.schema.js";

export const mutualFundCommunityRoutes = Router({ mergeParams: true });

mutualFundCommunityRoutes.get(
  "/portfolio",
  validate(getMutualFundPortfolioSchema),
  mutualFundCommunityController.getPortfolio,
);
mutualFundCommunityRoutes.get(
  "/portfolio/summary",
  validate(mutualFundUsernameParamsSchema),
  mutualFundCommunityController.getPortfolioSummary,
);
mutualFundCommunityRoutes.get(
  "/portfolio/:schemeCode/orders",
  validate(getFundOrdersSchema),
  mutualFundCommunityController.getFundOrders,
);
mutualFundCommunityRoutes.get(
  "/orders",
  validate(mutualFundUsernameParamsSchema),
  mutualFundCommunityController.getAllOrders,
);
mutualFundCommunityRoutes.get(
  "/orders/:orderId",
  validate(orderIdParamSchema),
  mutualFundCommunityController.getOrderDetail,
);
mutualFundCommunityRoutes.get(
  "/sips",
  validate(mutualFundUsernameParamsSchema),
  mutualFundCommunityController.getSips,
);
mutualFundCommunityRoutes.get(
  "/sips/:sipId",
  validate(sipIdParamSchema),
  mutualFundCommunityController.getSipDetail,
);
mutualFundCommunityRoutes.get(
  "/watchlist",
  validate(mutualFundUsernameParamsSchema),
  mutualFundCommunityController.getWatchlist,
);
