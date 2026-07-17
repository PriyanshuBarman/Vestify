import { useQuery } from "@tanstack/react-query";

import { fetchStockData } from "../api/stock";

export function useGetStockData(symbol) {
  return useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => fetchStockData(symbol),
    enabled: !!symbol,
  });
}
