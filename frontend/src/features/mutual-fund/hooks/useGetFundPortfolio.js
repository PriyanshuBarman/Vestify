import { useQuery } from "@tanstack/react-query";
import { fetchFundPortfolio } from "../api/portfolio";

export function useGetFundPortfolio(schemeCode) {
  return useQuery({
    queryKey: ["fundPortfolio", schemeCode],
    queryFn: () => fetchFundPortfolio(schemeCode),
  });
}
