import { useEffect } from "react";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";

import { fetchOrders, fetchPendingOrders } from "../api/order";
import { fetchPortfolio, fetchPortfolioSummary } from "../api/portfolio";
import { fetchSips } from "../api/sip";
import { fetchWatchlist } from "../api/watchlist";

export function usePrefetchRequiredQueries(username) {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();

  useEffect(() => {
    if (isRestoring) return;

    const userKey = username || "self";

    queryClient.prefetchQuery({
      queryKey: [userKey, "mfPortfolio"],
      queryFn: () => fetchPortfolio(username),
    });
    queryClient.prefetchQuery({
      queryKey: [userKey, "mfPortfolioSummary"],
      queryFn: () => fetchPortfolioSummary(username),
    });
    queryClient.prefetchQuery({
      queryKey: [userKey, "sips"],
      queryFn: () => fetchSips(username),
    });
    queryClient.prefetchQuery({
      queryKey: [userKey, "watchlist"],
      queryFn: () => fetchWatchlist(username),
    });
    queryClient.prefetchQuery({
      queryKey: [userKey, "orders"],
      queryFn: () => fetchOrders(username),
    });
    queryClient.prefetchQuery({
      queryKey: ["pending-orders"],
      queryFn: fetchPendingOrders,
    });
  }, [isRestoring, queryClient, username]);
}
