import { useQuery } from "@tanstack/react-query";

import { fetchOrders } from "../api/order";

export function useGetOrders(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "mutual-funds", "orders"],
    queryFn: () => fetchOrders(username),
    staleTime: 0,
  });
}
