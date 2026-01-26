import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetail } from "../api/order";

export function useGetOrderDetail(orderId, username) {
  return useQuery({
    queryKey: ["order", orderId, username],
    queryFn: () => fetchOrderDetail(orderId, username),
    ...(username && { staleTime: 0 }),
  });
}
