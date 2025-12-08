import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchChartData,
  fetchFund,
  fetchFundCategoryRanking,
  fetchPopularFunds,
} from "../api/external";

export function useGetPopularFunds() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["popularFunds"],
    queryFn: async () => {
      const funds = await fetchPopularFunds();

      for (const fund of funds) {
        queryClient.prefetchQuery({
          queryKey: ["fund", Number(fund.scheme_code)],
          queryFn: () => fetchFund(fund.scheme_code),
        });
        queryClient.prefetchQuery({
          queryKey: ["fund-chart", Number(fund.scheme_code)],
          queryFn: () => fetchChartData(fund.scheme_code),
        });
        queryClient.prefetchQuery({
          queryKey: ["fund-category-ranking", Number(fund.scheme_code)],
          queryFn: () => fetchFundCategoryRanking(fund.scheme_code),
        });
      }

      return funds;
    },
    placeholderData: [{}, {}, {}, {}],
  });
}
