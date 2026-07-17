import { useQuery } from "@tanstack/react-query";

import { fetchStockHistoricalData } from "../api/stock";

export function useGetChart(symbol) {
  return useQuery({
    queryKey: ["stock-chart", symbol],
    queryFn: () => fetchStockHistoricalData(symbol),
    enabled: !!symbol,
    refetchOnWindowFocus: false,
  });
}
