import { useQuery } from "@tanstack/react-query";

import { fetchWatchlist } from "../api/watchlist";

export function useGetWatchlist(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "watchlist"],
    queryFn: () => fetchWatchlist(username),
    ...(username && { staleTime: 0 }),
  });
}
