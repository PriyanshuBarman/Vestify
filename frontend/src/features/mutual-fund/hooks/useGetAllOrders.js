import { useQuery } from "@tanstack/react-query";

import { fetchOrders } from "../api/order";

export function useGetAllOrders(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "orders"],
    queryFn: () => fetchOrders(username),
    staleTime: 0,
    gcTime: 0,
  });
}
