import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchChartData,
  fetchFund,
  fetchFundCategoryRanking,
  fetchPopularFunds,
} from "../api/external";

export function useGetPopularFunds() {
  return useQuery({
    queryKey: ["popularFunds"],
    queryFn: fetchPopularFunds,
    placeholderData: [{}, {}, {}, {}],
  });
}
