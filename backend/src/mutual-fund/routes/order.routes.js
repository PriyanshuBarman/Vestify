import { validatePinLimiter } from "#shared/middlewares/rate-limiter.middleware.js";
import { validate } from "#shared/middlewares/validate.middleware.js";
import { verifyPin } from "#shared/middlewares/verify-pin.middleware.js";
import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import {
  investmentOrderSchema,
  redemptionOrderSchema,
  orderIdParamSchema,
} from "../schemas/order.schema.js";
import { schemeCodeParamSchema } from "#shared/schemas/schemecode-params.schema.js";

export const orderRoutes = Router();

orderRoutes.post(
  "/invest",
  validate(investmentOrderSchema),
  validatePinLimiter,
  verifyPin,
  orderController.placeInvestmentOrder,
);

orderRoutes.put(
  "/redeem/:folio",
  validate(redemptionOrderSchema),
  orderController.placeRedemptionOrder,
);

orderRoutes.get("/", orderController.getAllOrders);
orderRoutes.get("/pending", orderController.getPendingOrders);
orderRoutes.get(
  "/:orderId",
  validate(orderIdParamSchema),
  orderController.getOrderDetail,
);
orderRoutes.get(
  "/fund/:schemeCode",
  validate(schemeCodeParamSchema),
  orderController.getFundOrders,
);
