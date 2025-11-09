import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as orderController from "../controllers/order.controller.js";
import {
  validateRedemptionOrder,
  validateInvestmentOrder,
} from "../validators/order.validator.js";
import { verifyPin } from "../../shared/middlewares/verify-pin.middleware.js";

export const orderRoutes = Router();

orderRoutes.post(
  "/invest",
  authenticate,
  validateInvestmentOrder,
  verifyPin,
  orderController.placeInvestmentOrder
);

orderRoutes.put(
  "/redeem",
  authenticate,
  validateRedemptionOrder,
  orderController.placeRedemptionOrder
);

orderRoutes.get("/", authenticate, orderController.getAllOrders);
orderRoutes.get("/pending", authenticate, orderController.getPendingOrders);
orderRoutes.get("/:orderId", authenticate, orderController.getOrderDetail);
orderRoutes.get(
  "/fund/:schemeCode",
  authenticate,
  orderController.getFundOrders
);
