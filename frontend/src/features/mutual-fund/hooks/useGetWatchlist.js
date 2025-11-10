import { useQuery } from "@tanstack/react-query";
import { fetchWatchlist } from "../api/watchlist";

export function useGetWatchlist() {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
  });
}
