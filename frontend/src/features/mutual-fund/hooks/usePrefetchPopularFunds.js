import { useEffect } from "react";
import { useIsRestoring, useQueryClient } from "@tanstack/react-query";

import { fetchFund } from "../api/external";

export function usePrefetchPopularFunds(funds) {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();

  useEffect(() => {
    if (isRestoring) return;

    for (const fund of funds) {
      queryClient.prefetchQuery({
        queryKey: ["mutual-funds", "fund", Number(fund.scheme_code)],
        queryFn: () => fetchFund(fund.scheme_code),
      });
    }
  }, [isRestoring, queryClient, funds]);
}
