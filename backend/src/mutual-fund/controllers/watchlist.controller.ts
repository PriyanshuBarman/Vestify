import type { SchemeCodeParams } from "@/shared/schemas/schemecode-params.schema.js";
import type { ApiRequest } from "@/shared/types/types.js";
import type { Response } from "express";
import type { AddToWatchlistSchema } from "../schemas/watchlist.schema.js";
import * as watchlistService from "../services/watchlist.service.js";

export const addToWatchlist = async (
  req: ApiRequest<AddToWatchlistSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  await watchlistService.addToWatchlist(userId, req.body);

  res.status(201).json({ success: true, message: "added to watchlist" });
};

export const removeFromWatchlist = async (
  req: ApiRequest<{}, SchemeCodeParams>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { schemeCode } = req.params;

  await watchlistService.removeFromWatchlist(userId, Number(schemeCode));

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
  req: ApiRequest<unknown, SchemeCodeParams>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { schemeCode } = req.params;

  const isWatchlisted = await watchlistService.isInWatchlist(
    userId,
    Number(schemeCode),
  );

  res.status(200).json({ success: true, isWatchlisted });
};
