import { asyncHandler } from "#shared/utils/async-handler.utils.js";
import * as orderService from "../../mutual-fund/services/order.service.js";
import * as portfolioService from "../../mutual-fund/services/portfolio.service.js";
import * as sipService from "../../mutual-fund/services/sip.service.js";
import * as watchlistService from "../../mutual-fund/services/watchlist.service.js";
import * as communityService from "../services/community.service.js";

export const getUsers = asyncHandler(async (req, res) => {
  const { offset = 0, limit = 20 } = req.query;
  const { users, totalCount } = await communityService.getUsers({
    skip: Number(offset),
    take: Number(limit),
  });
  return res.status(200).json({ success: true, users, totalCount });
});

export const searchUsers = asyncHandler(async (req, res) => {
  const { query, limit = 10 } = req.query;
  const users = await communityService.searchUsers({
    query,
    limit: Number(limit),
  });
  return res.status(200).json({ success: true, users });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const profile = await communityService.getUserProfile(username);
  return res.status(200).json({ success: true, profile });
});

export const getPortfolio = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { sort_by, order_by, fund_type } = req.query;

  const userId = await communityService.getUserIdByUsername(username);
  const portfolio = await portfolioService.getPortfolio({
    userId,
    fundType: fund_type?.toUpperCase(),
    sort_by,
    order_by,
  });

  return res
    .status(200)
    .json({ success: true, sort_by, order_by, fund_type, portfolio });
});

export const getFundOrders = asyncHandler(async (req, res) => {
  const { username, schemeCode } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const orders = await orderService.getFundOrders(userId, schemeCode);
  return res.status(200).json({ success: true, orders });
});

export const getSips = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const data = await sipService.getAllSips(userId);
  return res.status(200).json({
    success: true,
    sips: data.allSips,
    totalActiveSipAmount: data.totalActiveSipAmount,
  });
});

export const getSipDetail = asyncHandler(async (req, res) => {
  const { sipId } = req.params;
  const data = await sipService.getSipDetail(sipId);
  return res.status(200).json({
    success: true,
    sip: data.sipDetail,
    installments: data.installments,
  });
});

export const getWatchlist = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const userId = await communityService.getUserIdByUsername(username);
  const watchlist = await watchlistService.getWatchlist(userId);
  return res.status(200).json({ success: true, watchlist });
});

export const getOrderDetail = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await orderService.getOrderDetail(orderId);
  return res.status(200).json({ success: true, order });
});
