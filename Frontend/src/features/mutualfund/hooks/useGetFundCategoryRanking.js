import { useQuery } from "@tanstack/react-query";
import { fetchFundCategoryRanking } from "../api/external";

export function useGetFundCategoryRanking(schemeCode) {
  return useQuery({
    queryKey: ["FundRanking", schemeCode],
    queryFn: () => fetchFundCategoryRanking(schemeCode),
  });
}
