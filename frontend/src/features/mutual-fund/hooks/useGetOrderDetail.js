import { useQuery } from "@tanstack/react-query";

import { fetchOrderDetail } from "../api/order";

export function useGetOrderDetail(orderId, username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "order", orderId],
    queryFn: () => fetchOrderDetail(orderId),
    ...(username && { staleTime: 0 }),
  });
}
