import type { ApiRequest } from "@/shared/types/types.js";
import type { Response } from "express";
import * as orderService from "../services/order.service.js";
import type {
  BuyOrderSchema,
  OrderIdParamSchema,
  SellOrderSchema,
  ModifyOrderSchema,
} from "../schemas/order.schema.js";

export const placeBuyOrder = async (
  req: ApiRequest<BuyOrderSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const order = await orderService.placeBuyOrder(userId, req.body);
  res.status(201).json({
    success: true,
    message: "Buy order placed successfully",
    order,
  });
};

export const placeSellOrder = async (
  req: ApiRequest<SellOrderSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const order = await orderService.placeSellOrder(userId, req.body);
  res.status(201).json({
    success: true,
    message: "Sell order placed successfully",
    order,
  });
};

export const cancelOrder = async (
  req: ApiRequest<{}, OrderIdParamSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { orderId } = req.params;
  await orderService.cancelOrder(userId, orderId);
  res
    .status(200)
    .json({ success: true, message: "Order cancelled successfully" });
};

export const getAllOrders = async (req: ApiRequest, res: Response) => {
  const { userId } = req.user!;
  const orders = await orderService.getAllOrders(userId);
  res.status(200).json({ success: true, orders });
};

export const getPendingOrders = async (req: ApiRequest, res: Response) => {
  const { userId } = req.user!;
  const orders = await orderService.getPendingOrders(userId);
  res.status(200).json({ success: true, orders });
};

export const getTodayOrders = async (req: ApiRequest, res: Response) => {
  const { userId } = req.user!;
  const orders = await orderService.getTodayOrders(userId);
  res.status(200).json({ success: true, orders });
};

export const getOrderDetail = async (
  req: ApiRequest<unknown, OrderIdParamSchema>,
  res: Response,
) => {
  const { orderId } = req.params;
  const order = await orderService.getOrderDetail(orderId);
  res.status(200).json({ success: true, order });
};

export const modifyOrder = async (
  req: ApiRequest<ModifyOrderSchema, { orderId: string }>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { orderId } = req.params;
  const order = await orderService.modifyOrder(userId, orderId, req.body);
  res.status(200).json({
    success: true,
    message: "Order modified successfully",
    order,
  });
};
