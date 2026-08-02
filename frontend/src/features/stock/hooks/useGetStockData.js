import { useQuery } from "@tanstack/react-query";

import { fetchStockData } from "../api/stock";

export function useGetStockData(symbol) {
  return useQuery({
    queryKey: ["stocks", "quote", symbol],
    queryFn: () => fetchStockData(symbol),
    enabled: Boolean(symbol),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
