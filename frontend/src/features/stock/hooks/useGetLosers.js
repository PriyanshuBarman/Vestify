import { useQuery } from "@tanstack/react-query";

import { fetchLosers } from "../api/stock";

export function useGetLosers(index) {
  return useQuery({
    queryKey: ["stocks", "losers", index],
    queryFn: () => fetchLosers(index),
    placeholderData: [{}, {}, {}, {}],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
