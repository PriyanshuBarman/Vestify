import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioSummary } from "../api/portfolio";

export function useGetPortfolioSummary() {
  return useQuery({
    queryKey: ["mfPortfolioSummary"],
    queryFn: fetchPortfolioSummary,
  });
}
