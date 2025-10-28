import { api } from "@/lib/axios";

export const fetchPortfolio = async () => {
  const { data } = await api.get(`/mutual-funds/portfolio`);
  return data.portfolio;
};

export const fetchFundPortfolio = async (schemeCode) => {
  const { data } = await api.get(`/mutual-funds/portfolio/${schemeCode}`);
  return data.fund;
};

export const fetchPortfolioSummary = async () => {
  const { data } = await api.get(`/mutual-funds/portfolio/summary`);
  return data.portfolioSummary;
};
