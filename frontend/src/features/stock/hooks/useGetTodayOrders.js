import { useQuery } from "@tanstack/react-query";

import { fetchTodayOrders } from "../api/stock";

export function useGetTodayOrders(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "stocks", "today-orders"],
    queryFn: () => fetchTodayOrders(username),
    staleTime: 0,
  });
}
