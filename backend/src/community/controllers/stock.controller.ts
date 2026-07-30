import type { ApiRequest } from "@/shared/types/types.js";
import type { Response } from "express";
import * as orderService from "../../stock/services/order.service.js";
import * as portfolioService from "../../stock/services/portfolio.service.js";
import * as watchlistService from "../../stock/services/watchlist.service.js";
import * as communityService from "../services/community.service.js";

export const getStockPortfolio = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const portfolio = await portfolioService.getStockPortfolio(userId);
  res.status(200).json({ success: true, portfolio });
};

export const getSingleStockPortfolio = async (
  req: ApiRequest<{}, { username: string; symbol: string }>,
  res: Response,
) => {
  const { username, symbol } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const portfolio = await portfolioService.getSingleStockPortfolio(
    userId,
    symbol,
  );
  res.status(200).json({ success: true, portfolio });
};

export const getSingleStockHoldings = async (
  req: ApiRequest<{}, { username: string; symbol: string }>,
  res: Response,
) => {
  const { username, symbol } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const holdings = await portfolioService.getSingleStockHoldings(
    userId,
    symbol,
  );
  res.status(200).json({ success: true, holdings });
};

export const getAllStockOrders = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const orders = await orderService.getAllOrders(userId);
  res.status(200).json({ success: true, orders });
};

export const getPendingStockOrders = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const orders = await orderService.getPendingOrders(userId);
  res.status(200).json({ success: true, orders });
};

export const getTodayStockOrders = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const orders = await orderService.getTodayOrders(userId);
  res.status(200).json({ success: true, orders });
};

export const getStockOrderDetail = async (
  req: ApiRequest<{}, { orderId: string }>,
  res: Response,
) => {
  const { orderId } = req.params;
  const order = await orderService.getOrderDetail(orderId);
  res.status(200).json({ success: true, order });
};

export const getStockWatchlist = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const watchlist = await watchlistService.getWatchlist(userId);
  res.status(200).json({ success: true, watchlist });
};
