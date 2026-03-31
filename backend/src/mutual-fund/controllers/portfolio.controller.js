import * as portfolioService from "../services/portfolio.service.js";

export const getPortfolio = async (req, res) => {
  const { userId } = req.user;
  const { sort_by, order_by, fund_type } = req.query;

  const portfolio = await portfolioService.getPortfolio({
    userId,
    fundType: fund_type?.toUpperCase(),
    sort_by,
    order_by,
  });

  return res
    .status(200)
    .json({ success: true, sort_by, order_by, fund_type, portfolio });
};

export const getFundPortfolio = async (req, res) => {
  const { schemeCode } = req.params;
  const { userId } = req.user;

  const fund = await portfolioService.getFundPortfolio(userId, schemeCode);

  return res.status(200).json({ success: true, fund });
};

export const getPortfolioSummary = async (req, res) => {
  const { userId } = req.user;

  const portfolioSummary = await portfolioService.getPortfolioSummary(userId);

  return res.status(200).json({ success: true, portfolioSummary });
};
