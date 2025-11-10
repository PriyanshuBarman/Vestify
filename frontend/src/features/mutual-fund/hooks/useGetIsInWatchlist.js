import { useQuery } from "@tanstack/react-query";
import { isInWatchlist } from "../api/watchlist";

export function useGetIsInWatchlist(schemeCode) {
  return useQuery({
    queryKey: ["isInWatchlist", schemeCode],
    queryFn: () => isInWatchlist(schemeCode),
  });
}
