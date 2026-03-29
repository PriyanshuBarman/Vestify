import { useQuery } from "@tanstack/react-query";

import { fetchPortfolio } from "../api/portfolio";

export function useGetPortfolio(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "mfPortfolio"],
    queryFn: () => fetchPortfolio(username),
    ...(username && { staleTime: 0 }),
  });
}
