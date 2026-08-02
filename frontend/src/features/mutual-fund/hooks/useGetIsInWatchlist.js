import { useQuery } from "@tanstack/react-query";

import { isInWatchlist } from "../api/watchlist";

export function useGetIsInWatchlist(schemeCode) {
  return useQuery({
    queryKey: ["mutual-funds", "is-in-watchlist", schemeCode],
    queryFn: () => isInWatchlist(schemeCode),
  });
}
