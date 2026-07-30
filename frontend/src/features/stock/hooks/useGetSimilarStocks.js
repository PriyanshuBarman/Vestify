import { useQuery } from "@tanstack/react-query";

import { fetchSimilarStocks } from "../api/stock";

export function useGetSimilarStocks(symbol) {
  return useQuery({
    queryKey: ["stocks", "similar", symbol],
    queryFn: () => fetchSimilarStocks(symbol),
    enabled: Boolean(symbol),
    staleTime: "5 * 60 * 1000",
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
