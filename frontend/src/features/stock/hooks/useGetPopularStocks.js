import { useQuery } from "@tanstack/react-query";

import { fetchPopularStocks } from "../api/stock";

export function useGetPopularStocks() {
  return useQuery({
    queryKey: ["stocks", "popular"],
    queryFn: fetchPopularStocks,
    placeholderData: [{}, {}, {}, {}],
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
