import { useQuery } from "@tanstack/react-query";

import { fetchAllOrders } from "../api/stock";

export function useGetAllOrders(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "stocks", "orders"],
    queryFn: () => fetchAllOrders(username),
    staleTime: 0,
  });
}
