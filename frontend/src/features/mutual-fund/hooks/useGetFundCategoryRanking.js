import { useQuery } from "@tanstack/react-query";

import { fetchFundCategoryRanking } from "../api/external";

export function useGetFundCategoryRanking(schemeCode) {
  return useQuery({
    queryKey: ["mutual-funds", "fund-category-ranking", Number(schemeCode)],
    queryFn: () => fetchFundCategoryRanking(schemeCode),
  });
}
