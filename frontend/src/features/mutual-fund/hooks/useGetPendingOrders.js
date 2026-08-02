import { useQuery } from "@tanstack/react-query";

import { fetchPendingOrders } from "../api/order";

export function useGetPendingOrders() {
  const userKey = "self";

  return useQuery({
    queryKey: [userKey, "mutual-funds", "pending-orders"],
    queryFn: fetchPendingOrders,
    staleTime: 0,
  });
}
