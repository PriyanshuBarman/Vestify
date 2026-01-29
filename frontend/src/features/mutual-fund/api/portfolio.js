import { api } from "@/lib/axios";

export const fetchPortfolio = async (username) => {
  const url = username
    ? `/community/users/${username}/portfolio`
    : `/mutual-funds/portfolio`;
  const { data } = await api.get(url);
  return data.portfolio;
};

export const fetchFundPortfolio = async (schemeCode) => {
  const { data } = await api.get(`/mutual-funds/portfolio/${schemeCode}`);
  return data.fund;
};

export const fetchPortfolioSummary = async (username) => {
  const url = username
    ? `/community/users/${username}/portfolio/summary` // Community profile endpoint returns summary
    : `/mutual-funds/portfolio/summary`;
  const { data } = await api.get(url);
  return data.portfolioSummary;
};
