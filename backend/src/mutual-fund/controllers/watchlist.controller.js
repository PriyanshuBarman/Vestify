import * as watchlistService from "../services/watchlist.service.js";

export const addToWatchlist = async (req, res) => {
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
};

export const removeFromWatchlist = async (req, res) => {
  const { userId } = req.user;
  const { schemeCode } = req.params;

  await watchlistService.removeFromWatchlist(userId, schemeCode);

  res
    .status(200)
    .json({ success: true, message: "Successfully removed from watchlist" });
};

export const getWatchlist = async (req, res) => {
  const { userId } = req.user;
  const watchlist = await watchlistService.getWatchlist(userId);

  res.status(200).json({ success: true, watchlist });
};

export const isInWatchlist = async (req, res) => {
  const { userId } = req.user;
  const { schemeCode } = req.params;

  const isWatchlisted = await watchlistService.isInWatchlist(
    userId,
    schemeCode,
  );

  res.status(200).json({ success: true, isWatchlisted });
};
