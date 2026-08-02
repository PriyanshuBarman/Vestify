import { useQuery } from "@tanstack/react-query";

import { isInWatchlist } from "../api/watchlist";

export function useGetIsInWatchlist(symbol) {
  return useQuery({
    queryKey: ["stocks", "is-in-watchlist", symbol],
    queryFn: () => isInWatchlist(symbol),
    enabled: !!symbol,
  });
}
