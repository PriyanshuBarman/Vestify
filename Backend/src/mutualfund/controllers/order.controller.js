import { ApiError } from "../../shared/utils/apiError.utils.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as orderService from "../services/order.service.js";

export const placeInvestmentOrder = asyncHandler(async (req, res) => {
  const { userId } = req.user;
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

  return res.status(201).json({
    success: true,
    message: "Investment Order Placed",
    order,
  });
});

export const placeRedemptionOrder = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { amount, folio, isInstant = false } = req.body;

  const order = await orderService.placeRedemptionOrder({
    userId,
    amount,
    folio,
    isInstant,
  });

  return res.status(201).json({
    success: true,
    message: "Redemption Order Placed",
    order,
  });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const orders = await orderService.getAllOrders(userId);

  return res.status(200).json({
    success: true,
    orders,
  });
});

export const getPendingOrders = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const orders = await orderService.getPendingOrders(userId);

  return res.status(200).json({
    success: true,
    orders,
  });
});

export const getOrderDetail = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await orderService.getOrderDetail(orderId);

  return res.status(200).json({
    success: true,
    order,
  });
});

export const getFundOrders = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { schemeCode } = req.params;

  if (!schemeCode) {
    throw new ApiError(400, "schemeCode is required");
  }

  const orders = await orderService.getFundOrders(userId, schemeCode);

  return res.status(200).json({
    success: true,
    orders,
  });
});
