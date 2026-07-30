import { api, mfHelperApi } from "@/lib/axios";

export const fetchSearchResults = async (query, type) => {
  if (type === "mutualFunds") {
    const { data } = await mfHelperApi.get(`/search?query=${query}`);
    return data.funds;
  } else if (type === "indianStocks") {
    const { data } = await api.get(`/stocks/search?query=${query}`);
    return data.data;
  }
  return null;
};
