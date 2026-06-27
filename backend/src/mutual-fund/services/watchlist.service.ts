import { db } from "@/config/db.config.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import type { AddToWatchlistSchema } from "../schemas/watchlist.schema.js";

export const addToWatchlist = async (
  userId: string,
  data: AddToWatchlistSchema,
) => {
  const alreadyWatchlisted = await isInWatchlist(userId, data.schemeCode);
  if (alreadyWatchlisted) {
    throw new ApiError(400, "Fund is already in watchlist");
  }

  return db.mfWatchlist.create({
    data: {
      userId,
      schemeCode: data.schemeCode,
      fundName: data.fundName,
      fundShortName: data.fundShortName,
      fundHouseDomain: data.fundHouseDomain,
    },
  });
};

export const removeFromWatchlist = async (
  userId: string,
  schemeCode: number,
) => {
  return db.mfWatchlist.delete({
    where: { userId_schemeCode: { userId, schemeCode } },
  });
};

export const getWatchlist = async (userId: string) => {
  return db.mfWatchlist.findMany({
    where: { userId },
  });
};

export const isInWatchlist = async (userId: string, schemeCode: number) => {
  const watchlistItem = await db.mfWatchlist.findUnique({
    where: { userId_schemeCode: { userId, schemeCode } },
  });

  return !!watchlistItem;
};
