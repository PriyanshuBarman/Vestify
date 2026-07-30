import { useQuery } from "@tanstack/react-query";

import { fetchOpenOrders } from "../api/stock";

export function useGetOpenOrders(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "stocks", "open-orders"],
    queryFn: () => fetchOpenOrders(username),
    staleTime: 0,
  });
}
