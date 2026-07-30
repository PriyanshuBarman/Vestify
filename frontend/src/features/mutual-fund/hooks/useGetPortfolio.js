import { useQuery } from "@tanstack/react-query";

import { fetchPortfolio } from "../api/portfolio";

export function useGetPortfolio(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "mutual-funds", "portfolio"],
    queryFn: () => fetchPortfolio(username),
    ...(username && { staleTime: 0 }),
  });
}
