import { db } from "../../../config/db.config.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";
import { normalizePortfolio } from "../utils/normalizePortfolio.utils.js";

export const fetchPortfolio = async (data) => {
  const { userId, fundType, sort_by = "current", order_by = "desc" } = data;

  const portfolio = await db.mfPortfolio.findMany({
    where: { userId, fundType },
    orderBy: { [sort_by]: order_by },
  });

  if (!portfolio.length) {
    throw new ApiError(404, "No portfolio found.");
  }

  return normalizePortfolio(portfolio);
};

export const fetchFundPortfolio = async (userId, schemeCode) => {
  schemeCode = Number(schemeCode);

  const fund = await db.mfPortfolio.findUnique({
    where: {
      userId_schemeCode: { userId, schemeCode },
    },
  });

  if (!fund) throw new ApiError(404, "Fund not found in portfolio.");

  return normalizePortfolio(fund);
};

export const fetchPortfolioSummary = async (userId) => {
  const result = await db.mfPortfolio.aggregate({
    where: { userId },
    _sum: {
      current: true,
      invested: true,
      pnl: true,
      returnPercent: true,
      dayChangeValue: true,
      dayChangePercent: true,
    },
  });

  if (!result._sum.invested) {
    throw new ApiError(404, "No portfolio found.");
  }

  const current = result._sum.current?.toNumber();
  const invested = result._sum.invested?.toNumber();
  const pnl = result._sum.pnl?.toNumber();
  const dayChangeValue = result._sum.dayChangeValue?.toNumber();

  const returnPercent = (pnl / invested) * 100;
  const prevCurrent = current - dayChangeValue;
  const dayChangePercent = (dayChangeValue / prevCurrent) * 100;

  return {
    current,
    invested,
    pnl,
    returnPercent,
    dayChangeValue,
    dayChangePercent,
  };
};
