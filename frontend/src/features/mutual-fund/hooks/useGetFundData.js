import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchFund, fetchFundCategoryRanking } from "../api/external";

export function useGetFundData(schemeCode) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["mutual-funds", "fund", Number(schemeCode)],
    queryFn: () => {
      queryClient.prefetchQuery({
        queryKey: ["mutual-funds", "fund-category-ranking", Number(schemeCode)],
        queryFn: () => fetchFundCategoryRanking(schemeCode),
      });

      return fetchFund(schemeCode);
    },
  });
}
