import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchOrders, fetchPendingOrders } from "../api/order";
import { fetchPortfolio, fetchPortfolioSummary } from "../api/portfolio";

export function usePrefetchRequiredQueries() {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();

  useEffect(() => {
    if (isRestoring) return;

    queryClient.prefetchQuery({
      queryKey: ["mfPortfolio"],
      queryFn: fetchPortfolio,
    });
    queryClient.prefetchQuery({
      queryKey: ["mfPortfolioSummary"],
      queryFn: fetchPortfolioSummary,
    });
    queryClient.prefetchQuery({
      queryKey: ["pending-orders"],
      queryFn: fetchPendingOrders,
    });
    queryClient.prefetchQuery({
      queryKey: ["orders"],
      queryFn: fetchOrders,
    });
  }, []);
}
