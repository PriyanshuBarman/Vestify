import { ApiError } from "#shared/utils/api-error.utils.js";
import { asyncHandler } from "#shared/utils/async-handler.utils.js";
import * as watchlistService from "../services/watchlist.service.js";

export const addToWatchlist = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { schemeCode, fundName, fundShortName, fundHouseDomain } = req.body;

  await watchlistService.addToWatchlist({
    userId,
    schemeCode,
    fundName,
    fundShortName,
    fundHouseDomain,
  });

  res.status(201).json({ success: true, message: "added to watchlist" });
});

export const removeFromWatchlist = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { schemeCode } = req.params;

  if (!schemeCode) {
    throw new ApiError(400, "schemeCode is required");
  }

  await watchlistService.removeFromWatchlist(userId, schemeCode);

  res
    .status(200)
    .json({ success: true, message: "Successfully removed from watchlist" });
});

export const getWatchlist = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const watchlist = await watchlistService.getWatchlist(userId);

  res.status(200).json({ success: true, watchlist });
});

export const isInWatchlist = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { schemeCode } = req.params;

  if (!schemeCode) {
    throw new ApiError(400, "schemeCode is required");
  }

  const isWatchlisted = await watchlistService.isInWatchlist(
    userId,
    schemeCode
  );

  res.status(200).json({ success: true, isWatchlisted });
});
