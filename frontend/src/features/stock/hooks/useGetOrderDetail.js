import { useQuery } from "@tanstack/react-query";

import { fetchOrderDetail } from "../api/stock";

export function useGetOrderDetail(orderId, username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "stocks", "order", orderId],
    queryFn: () => fetchOrderDetail(orderId, username),
    enabled: Boolean(orderId),
    staleTime: 0,
  });
}
