import { useQuery } from "@tanstack/react-query";

import { fetchSingleStockPortfolio } from "../api/stock";

export function useGetSingleStockPortfolio(symbol, username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "stocks", "portfolio", symbol],
    queryFn: () => fetchSingleStockPortfolio(symbol, username),
    enabled: Boolean(symbol),
    staleTime: 0,
  });
}
