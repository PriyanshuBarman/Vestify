import { useQuery } from "@tanstack/react-query";
import { fetchWatchlist } from "../api/watchlist";

export function useGetWatchlist(username) {
  return useQuery({
    queryKey: ["watchlist", username ? username : "self"],
    queryFn: () => fetchWatchlist(username),
    ...(username && { staleTime: 0 }),
  });
}
