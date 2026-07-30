import { db } from "@/config/db.config.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import type { AddToStockWatchlistSchema } from "../schemas/stock.schema.js";

export const addToWatchlist = async (
  userId: string,
  data: AddToStockWatchlistSchema,
) => {
  const alreadyWatchlisted = await db.stockWatchlist.findUnique({
    where: { userId_symbol: { userId, symbol: data.symbol } },
  });

  if (alreadyWatchlisted) {
    throw new ApiError(400, "Stock is already in watchlist");
  }

  return await db.stockWatchlist.create({
    data: {
      userId,
      symbol: data.symbol,
      name: data.name,
      shortName: data.shortName,
    },
  });
};

export const removeFromWatchlist = async (userId: string, symbol: string) => {
  const watchlisted = await isInWatchlist(userId, symbol);
  if (!watchlisted) {
    throw new ApiError(404, "Stock is not in watchlist");
  }

  await db.stockWatchlist.delete({
    where: { userId_symbol: { userId, symbol } },
  });
};

export const getWatchlist = async (userId: string) => {
  return await db.stockWatchlist.findMany({
    where: { userId },
  });
};

export const isInWatchlist = async (userId: string, symbol: string) => {
  const watchlistItem = await db.stockWatchlist.findUnique({
    where: { userId_symbol: { userId, symbol } },
  });

  return Boolean(watchlistItem);
};
