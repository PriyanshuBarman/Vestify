import { useQuery } from "@tanstack/react-query";

import { fetchPendingOrders } from "../api/order";

export function useGetPendingOrders() {
  const userKey = "self";

  return useQuery({
    queryKey: [userKey, "pending-orders"],
    queryFn: fetchPendingOrders,
    staleTime: 0,
    gcTime: 0,
  });
}
