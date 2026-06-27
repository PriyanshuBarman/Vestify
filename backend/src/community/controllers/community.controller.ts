import type { ApiRequest } from "@/shared/types/types.js";
import type { Response } from "express";
import * as orderService from "../../mutual-fund/services/order.service.js";
import * as portfolioService from "../../mutual-fund/services/portfolio.service.js";
import * as sipService from "../../mutual-fund/services/sip.service.js";
import * as watchlistService from "../../mutual-fund/services/watchlist.service.js";
import type { GetPortfolioSchema } from "../schemas/user.schema.js";
import * as communityService from "../services/community.service.js";

export const getUsers = async (
  req: ApiRequest<
    {},
    {},
    {
      offset: string;
      limit: string;
      sortBy: "createdAt" | "updatedAt" | "name";
    }
  >,
  res: Response,
) => {
  const { offset = 0, limit = 20, sortBy = "updatedAt" } = req.query;
  const { users, totalCount } = await communityService.getUsers({
    skip: Number(offset),
    take: Number(limit),
    sortBy,
  });
  res.status(200).json({ success: true, users, totalCount });
};

export const searchUsers = async (
  req: ApiRequest<{}, {}, { query: string; limit: string }>,
  res: Response,
) => {
  const { query, limit = 10 } = req.query;
  const users = await communityService.searchUsers({
    query,
    limit: Number(limit),
  });
  res.status(200).json({ success: true, users });
};

export const getUserProfile = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const profile = await communityService.getUserProfile(username);
  res.status(200).json({ success: true, profile });
};

export const getPortfolio = async (
  req: ApiRequest<{}, { username: string }, GetPortfolioSchema>,
  res: Response,
) => {
  const { username } = req.params;
  const { sort_by, order_by, fund_type } = req.query;

  const userId = await communityService.getUserIdByUsername(username);
  const portfolio = await portfolioService.getPortfolio({
    userId,
    fund_type,
    sort_by,
    order_by,
  });

  res
    .status(200)
    .json({ success: true, sort_by, order_by, fund_type, portfolio });
};

export const getPortfolioSummary = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const portfolioSummary = await portfolioService.getPortfolioSummary(userId);
  res.status(200).json({ success: true, portfolioSummary });
};

export const getAllOrders = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const orders = await orderService.getAllOrders(userId);
  res.status(200).json({ success: true, orders });
};

export const getFundOrders = async (
  req: ApiRequest<{}, { username: string; schemeCode: string }>,
  res: Response,
) => {
  const { username, schemeCode } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const orders = await orderService.getFundOrders(userId, Number(schemeCode));
  res.status(200).json({ success: true, orders });
};

export const getSips = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const data = await sipService.getAllSips(userId);
  res.status(200).json({
    success: true,
    sips: data.allSips,
    totalActiveSipAmount: data.totalActiveSipAmount,
  });
};

export const getSipDetail = async (
  req: ApiRequest<{}, { sipId: string }>,
  res: Response,
) => {
  const { sipId } = req.params;
  const data = await sipService.getSipDetail(sipId);
  res.status(200).json({
    success: true,
    sip: data.sipDetail,
    installments: data.installments,
  });
};

export const getWatchlist = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const watchlist = await watchlistService.getWatchlist(userId);
  return res.status(200).json({ success: true, watchlist });
};

export const getOrderDetail = async (
  req: ApiRequest<{}, { orderId: string }>,
  res: Response,
) => {
  const { orderId } = req.params;
  const order = await orderService.getOrderDetail(orderId);
  return res.status(200).json({ success: true, order });
};
