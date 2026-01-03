import { useIsRestoring, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  fetchChartData,
  fetchFund,
  fetchFundCategoryRanking,
} from "../api/external";

export function usePrefetchPopularFunds(funds) {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();

  useEffect(() => {
    if (isRestoring) return;

    for (const fund of funds) {
      queryClient.prefetchQuery({
        queryKey: ["fund", Number(fund.scheme_code)],
        queryFn: () => fetchFund(fund.scheme_code),
      });
      queryClient.prefetchQuery({
        queryKey: ["fund-chart", Number(fund.scheme_code)],
        queryFn: () => fetchChartData(fund.scheme_code),
      });
    }
  }, []);
}
