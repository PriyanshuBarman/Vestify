import { verifyPin } from "#shared/middlewares/verify-pin.middleware.js";
import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import {
  validateInvestmentOrder,
  validateRedemptionOrder,
} from "../validators/order.validator.js";
import { validatePinLimiter } from "#shared/middlewares/rate-limiter.middleware.js";

export const orderRoutes = Router();

orderRoutes.post(
  "/invest",
  validateInvestmentOrder,
  validatePinLimiter,
  verifyPin,
  orderController.placeInvestmentOrder,
);

orderRoutes.put(
  "/redeem",
  validateRedemptionOrder,
  orderController.placeRedemptionOrder,
);

orderRoutes.get("/", orderController.getAllOrders);
orderRoutes.get("/pending", orderController.getPendingOrders);
orderRoutes.get("/:orderId", orderController.getOrderDetail);
orderRoutes.get("/fund/:schemeCode", orderController.getFundOrders);
