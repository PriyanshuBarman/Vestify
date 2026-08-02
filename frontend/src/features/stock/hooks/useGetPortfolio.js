import { useQuery } from "@tanstack/react-query";

import { fetchPortfolio } from "../api/stock";

export function useGetPortfolio(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "stocks", "portfolio"],
    queryFn: () => fetchPortfolio(username),
    staleTime: 0,
  });
}
