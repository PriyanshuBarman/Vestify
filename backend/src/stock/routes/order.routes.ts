import { Router } from "express";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import {
  buyOrderSchema,
  sellOrderSchema,
  orderIdParamSchema,
  modifyOrderSchema,
} from "../schemas/order.schema.js";
import * as orderController from "../controllers/order.controller.js";

export const orderRoutes = Router();

orderRoutes.post(
  "/buy",
  validate(buyOrderSchema),
  orderController.placeBuyOrder,
);

orderRoutes.post(
  "/sell",
  validate(sellOrderSchema),
  orderController.placeSellOrder,
);

orderRoutes.patch(
  "/:orderId",
  validate(modifyOrderSchema),
  orderController.modifyOrder,
);

orderRoutes.delete(
  "/:orderId",
  validate(orderIdParamSchema),
  orderController.cancelOrder,
);

orderRoutes.get("/pending", orderController.getPendingOrders);
orderRoutes.get("/today", orderController.getTodayOrders);
orderRoutes.get(
  "/:orderId",
  validate(orderIdParamSchema),
  orderController.getOrderDetail,
);
orderRoutes.get("/", orderController.getAllOrders);
