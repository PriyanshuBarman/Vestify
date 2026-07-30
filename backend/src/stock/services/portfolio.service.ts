import { db } from "@/config/db.config.js";

export const getStockPortfolio = async (userId: string) => {
  return await db.stockPortfolio.findMany({
    where: { userId },
  });
};

export const getSingleStockPortfolio = async (
  userId: string,
  symbol: string,
) => {
  return await db.stockPortfolio.findUnique({
    where: {
      userId_symbol: { userId, symbol },
    },
  });
};

export const getSingleStockHoldings = async (
  userId: string,
  symbol: string,
) => {
  return await db.stockHolding.findMany({
    where: { userId, symbol },
    orderBy: { createdAt: "desc" },
  });
};
