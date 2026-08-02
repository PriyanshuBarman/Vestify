import type { ApiRequest } from "@/shared/types/types.js";
import type { Response } from "express";
import type {
  AddToStockWatchlistSchema,
  SymbolParamsSchema,
} from "../schemas/stock.schema.js";
import * as watchlistService from "../services/watchlist.service.js";

export const addToWatchlist = async (
  req: ApiRequest<AddToStockWatchlistSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  await watchlistService.addToWatchlist(userId, req.body);

  res.status(201).json({ success: true, message: "Added to watchlist" });
};

export const removeFromWatchlist = async (
  req: ApiRequest<{}, SymbolParamsSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { symbol } = req.params;

  await watchlistService.removeFromWatchlist(userId, symbol);

  res
    .status(200)
    .json({ success: true, message: "Successfully removed from watchlist" });
};

export const getWatchlist = async (req: ApiRequest, res: Response) => {
  const { userId } = req.user!;
  const watchlist = await watchlistService.getWatchlist(userId);

  res.status(200).json({ success: true, watchlist });
};

export const isInWatchlist = async (
  req: ApiRequest<unknown, SymbolParamsSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { symbol } = req.params;

  const isWatchlisted = await watchlistService.isInWatchlist(userId, symbol);

  res.status(200).json({ success: true, isWatchlisted });
};
