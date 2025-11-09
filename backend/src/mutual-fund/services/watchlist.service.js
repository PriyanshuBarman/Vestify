import { db } from "../../../config/db.config.js";
import { ApiError } from "../../shared/utils/api-error.utils.js";

export const addToWatchlist = async ({
  userId,
  schemeCode,
  fundName,
  fundShortName,
  fundHouseDomain,
}) => {
  const isAlreadyWatchlisted = await isInWatchlist(userId, schemeCode);
  if (isAlreadyWatchlisted) {
    throw new ApiError(400, "Fund is already in watchlist");
  }

  return await db.mfWatchlist.create({
    data: {
      userId,
      schemeCode: parseInt(schemeCode),
      fundName,
      fundShortName,
      fundHouseDomain,
    },
  });
};

export const removeFromWatchlist = async (userId, schemeCode) => {
  return await db.mfWatchlist.delete({
    where: { userId_schemeCode: { userId, schemeCode: parseInt(schemeCode) } },
  });
};

export const getWatchlist = async (userId) => {
  return await db.mfWatchlist.findMany({
    where: { userId },
  });
};

export const isInWatchlist = async (userId, schemeCode) => {
  const isWatchlisted = await db.mfWatchlist.findUnique({
    where: { userId_schemeCode: { userId, schemeCode: parseInt(schemeCode) } },
  });

  return !!isWatchlisted;
};
