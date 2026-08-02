import { useQuery } from "@tanstack/react-query";

import { fetchHistoricalChart } from "../api/stock";

export function useGetChart(symbol) {
  return useQuery({
    queryKey: ["stocks", "chart", symbol],
    queryFn: () => fetchHistoricalChart(symbol),
    enabled: Boolean(symbol),
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
