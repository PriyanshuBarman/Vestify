import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchOrders, fetchPendingOrders } from "../api/order";
import { fetchPortfolio, fetchPortfolioSummary } from "../api/portfolio";

export function usePrefetchRequiredQueries(username) {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();

  useEffect(() => {
    if (isRestoring) return;

    queryClient.prefetchQuery({
      queryKey: ["mfPortfolio", username ? username : "self"],
      queryFn: () => fetchPortfolio(username),
    });
    queryClient.prefetchQuery({
      queryKey: ["mfPortfolioSummary", username ? username : "self"],
      queryFn: () => fetchPortfolioSummary(username),
    });
    queryClient.prefetchQuery({
      queryKey: ["orders", username ? username : "self"],
      queryFn: () => fetchOrders(username),
    });

    queryClient.prefetchQuery({
      queryKey: ["pending-orders"],
      queryFn: fetchPendingOrders,
    });
  }, [isRestoring, username]);
}
