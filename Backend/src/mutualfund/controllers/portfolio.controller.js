import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as portfolioService from "../services/portfolio.service.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const getPortfolio = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { sort_by, order_by, fund_type } = req.query;

  const portfolio = await portfolioService.fetchPortfolio({
    userId,
    fundType: fund_type?.toUpperCase(),
    sort_by,
    order_by,
  });

  return res
    .status(200)
    .json({ success: true, sort_by, order_by, fund_type, portfolio });
});

export const getFundPortfolio = asyncHandler(async (req, res) => {
  const { schemeCode } = req.params;
  const { userId } = req.user;

  if (!schemeCode) {
    throw new ApiError(400, "schemeCode is required");
  }

  const fund = await portfolioService.fetchFundPortfolio(userId, schemeCode);

  return res.status(200).json({ success: true, fund });
});

export const getPortfolioSummary = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const portfolioSummary = await portfolioService.fetchPortfolioSummary(userId);

  return res.status(200).json({ success: true, portfolioSummary });
});
