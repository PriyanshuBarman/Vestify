import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as orderService from "../services/order.service.js";

export const placeInvestmentOrder = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const {
    amount,
    schemeCode,
    fundName,
    shortName,
    fundType,
    fundCategory,
    fundHouseDomain,
  } = req.body;

  const orderDetail = await orderService.placeInvestmentOrder({
    userId,
    amount,
    schemeCode,
    fundName,
    shortName,
    fundType,
    fundCategory,
    fundHouseDomain,
  });

  return res.status(201).json({
    success: true,
    message: "Investment Order Placed",
    orderDetail,
  });
});

export const placeRedemptionOrder = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { amount, fundId, isInstant = false } = req.body;

  await orderService.placeRedemptionOrder(userId, amount, fundId, isInstant);

  return res.status(201).json({
    success: true,
    message: "Redemption Order Placed",
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
  const { fundId } = req.params;

  if (!fundId) {
    throw new ApiError(400, "Fund ID is required");
  }

  const orders = await orderService.getFundOrders(userId, fundId);

  return res.status(200).json({
    success: true,
    orders,
  });
});
