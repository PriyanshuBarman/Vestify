import { useQuery } from "@tanstack/react-query";

import { fetchkWatchlist } from "../api/watchlist";

export function useGetWatchlist(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "stocks", "watchlist"],
    queryFn: () => fetchkWatchlist(username),
  });
}
