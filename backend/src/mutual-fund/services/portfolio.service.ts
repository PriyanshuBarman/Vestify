import { db } from "@/config/db.config.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import type { PortfolioQuerySchema } from "../schemas/portfolio.schema.js";
import { normalizePortfolio } from "../utils/normalize-portfolio.utils.js";

export const getPortfolio = async ({
  userId,
  fund_type,
  sort_by = "current",
  order_by = "desc",
}: PortfolioQuerySchema & { userId: string }) => {
  const portfolio = await db.mfPortfolio.findMany({
    where: { userId, fundType: fund_type },
    include: { sips: true },
    orderBy: { [sort_by]: order_by },
  });

  return normalizePortfolio(portfolio);
};

export const getFundPortfolio = async (userId: string, schemeCode: number) => {
  const fund = await db.mfPortfolio.findUnique({
    where: {
      userId_schemeCode: { userId, schemeCode },
    },
    include: { sips: true },
  });

  if (!fund) {
    throw new ApiError(400, "No such portfolio found for this fund");
  }

  return normalizePortfolio(fund);
};

export const getPortfolioSummary = async (userId: string) => {
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
    // Return zero values for users with no portfolio
    return {
      current: 0,
      invested: 0,
      pnl: 0,
      returnPercent: 0,
      dayChangeValue: 0,
      dayChangePercent: 0,
    };
  }

  const current = result._sum.current?.toNumber() ?? 0;
  const invested = result._sum.invested?.toNumber() ?? 0;
  const pnl = result._sum.pnl?.toNumber() ?? 0;
  const dayChangeValue = result._sum.dayChangeValue?.toNumber() ?? 0;

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
