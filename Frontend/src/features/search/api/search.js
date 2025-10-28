import { mfHelperApi, stockSearchApi } from "@/lib/axios";

export const fetchSearchResults = async (query, type) => {
  if (type === "mutualFunds") {
    const { data } = await mfHelperApi.get(`/search?query=${query}`);
    return data.funds;
  } else if (type === "indianStocks") {
    const { data } = await stockSearchApi.get(`query=${query}`);
    return data.data.funds.indian_stocks;
  }
  return null;
};

/**
 * This function is used to fetch the trending searches
 * But for now it is used to fetch the popular funds
 * TODO: Change the function to fetch the trending searches
 */
export const fetchTrendingSearches = async () => {
  const { data } = await mfHelperApi.get(
    `?plan=GROWTH&limit=4&sort_by=return_3y&category=Equity&fund_rating_gte=4`,
  );
  return data.funds;
};
