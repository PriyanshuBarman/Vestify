import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioSummary } from "../api/portfolio";

export function useGetPortfolioSummary(username) {
  return useQuery({
    queryKey: ["mfPortfolioSummary", username],
    queryFn: () => fetchPortfolioSummary(username),
    ...(username && { staleTime: 0 }),
  });
}
