import type { ApiRequest } from "@/shared/types/types.js";
import type { Request, Response } from "express";
import type {
  InvestmentOrderSchema,
  RedemptionOrderSchema,
} from "../schemas/order.schema.js";
import * as orderService from "../services/order.service.js";

export const placeInvestmentOrder = async (
  req: ApiRequest<InvestmentOrderSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const {
    amount,
    schemeCode,
    fundName,
    fundShortName,
    fundType,
    fundCategory,
    fundHouseDomain,
  } = req.body;

  const order = await orderService.placeInvestmentOrder({
    userId,
    amount,
    schemeCode,
    fundName,
    fundShortName,
    fundType,
    fundCategory,
    fundHouseDomain,
  });

  res.status(201).json({
    success: true,
    message: "Investment Order Placed",
    order,
  });
};

export const placeRedemptionOrder = async (
  req: ApiRequest<RedemptionOrderSchema, { folio: string }>,
  res: Response,
) => {
  const { userId } = req.user!;
  const folio = Number(req.params.folio);
  const { amount, isInstant = false } = req.body;

  const order = await orderService.placeRedemptionOrder({
    userId,
    amount,
    folio,
    isInstant,
  });

  res.status(201).json({
    success: true,
    message: "Redemption Order Placed",
    order,
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const orders = await orderService.getAllOrders(userId);

  res.status(200).json({
    success: true,
    orders,
  });
};

export const getPendingOrders = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const orders = await orderService.getPendingOrders(userId);

  res.status(200).json({
    success: true,
    orders,
  });
};

export const getOrderDetail = async (
  req: ApiRequest<{}, { orderId: string }>,
  res: Response,
) => {
  const { orderId } = req.params;

  const order = await orderService.getOrderDetail(orderId);

  res.status(200).json({
    success: true,
    order,
  });
};

export const getFundOrders = async (
  req: ApiRequest<{}, { schemeCode: string }>,
  res: Response,
) => {
  const { userId } = req.user!;
  const schemeCode = Number(req.params.schemeCode);

  const orders = await orderService.getFundOrders(userId, schemeCode);

  res.status(200).json({
    success: true,
    orders,
  });
};
