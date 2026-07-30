import { useQuery } from "@tanstack/react-query";

import { fetchPortfolioSummary } from "../api/portfolio";

export function useGetPortfolioSummary(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "mutual-funds", "portfolio-summary"],
    queryFn: () => fetchPortfolioSummary(username),
    ...(username && { staleTime: 0 }),
  });
}
