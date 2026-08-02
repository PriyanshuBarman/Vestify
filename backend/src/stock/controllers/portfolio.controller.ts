import type { ApiRequest } from "@/shared/types/types.js";
import type { Response } from "express";
import type { SymbolParamsSchema } from "../schemas/stock.schema.js";
import * as portfolioService from "../services/portfolio.service.js";

export const getStockPortfolio = async (req: ApiRequest, res: Response) => {
  const { userId } = req.user!;
  const portfolio = await portfolioService.getStockPortfolio(userId);
  res.status(200).json({ success: true, portfolio });
};

export const getSingleStockPortfolio = async (
  req: ApiRequest<{}, SymbolParamsSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { symbol } = req.params;
  const portfolio = await portfolioService.getSingleStockPortfolio(
    userId,
    symbol,
  );
  res.status(200).json({ success: true, portfolio });
};

export const getSingleStockHoldings = async (
  req: ApiRequest<{}, SymbolParamsSchema>,
  res: Response,
) => {
  const { userId } = req.user!;
  const { symbol } = req.params;
  const holdings = await portfolioService.getSingleStockHoldings(
    userId,
    symbol,
  );
  res.status(200).json({ success: true, holdings });
};
