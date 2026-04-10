import { useQuery } from "@tanstack/react-query";

import { isInWatchlist } from "../api/watchlist";

export function useGetIsInWatchlist(schemeCode) {
  const userKey = "self";

  return useQuery({
    queryKey: [userKey, "isInWatchlist", schemeCode],
    queryFn: () => isInWatchlist(schemeCode),
    staleTime: 0,
  });
}
