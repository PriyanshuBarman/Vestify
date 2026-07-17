import { useQuery } from "@tanstack/react-query";

import { fetchPopularStocks } from "../api/stock";

export function useGetpopularStocks() {
  return useQuery({
    queryKey: ["popularStocks"],
    queryFn: fetchPopularStocks,
    placeholderData: [{}, {}, {}, {}],
  });
}
