import type { ApiRequest } from "@/shared/types/types.js";
import type { Request, Response } from "express";

import type { PortfolioQuerySchema } from "../schemas/portfolio.schema.js";
import * as portfolioService from "../services/portfolio.service.js";

export const getPortfolio = async (
  req: ApiRequest<{}, PortfolioQuerySchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { sort_by, order_by, fund_type } = req.query;

  const portfolio = await portfolioService.getPortfolio({
    userId,
    fund_type,
    sort_by,
    order_by,
  });

  res
    .status(200)
    .json({ success: true, sort_by, order_by, fund_type, portfolio });
};

export const getFundPortfolio = async (
  req: ApiRequest<{}, { schemeCode: string }>,
  res: Response,
) => {
  const schemeCode = Number(req.params.schemeCode);
  const { userId } = req.user!;

  const fund = await portfolioService.getFundPortfolio(userId, schemeCode);

  res.status(200).json({ success: true, fund });
};

export const getPortfolioSummary = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const portfolioSummary = await portfolioService.getPortfolioSummary(userId);

  res.status(200).json({ success: true, portfolioSummary });
};
