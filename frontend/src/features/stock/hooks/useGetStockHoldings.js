import { useQuery } from "@tanstack/react-query";

import { fetchStockHoldings } from "../api/stock";

export function useGetStockHoldings(symbol, username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "stocks", "holdings", symbol],
    queryFn: () => fetchStockHoldings(symbol),
    enabled: Boolean(symbol),
  });
}
