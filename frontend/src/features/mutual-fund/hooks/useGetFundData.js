import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFund, fetchFundCategoryRanking } from "../api/external";

export function useGetFundData(schemeCode) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["fund", Number(schemeCode)],
    queryFn: () => {
      queryClient.prefetchQuery({
        queryKey: ["fund-category-ranking", Number(schemeCode)],
        queryFn: () => fetchFundCategoryRanking(schemeCode),
      });

      return fetchFund(schemeCode);
    },
  });
}
