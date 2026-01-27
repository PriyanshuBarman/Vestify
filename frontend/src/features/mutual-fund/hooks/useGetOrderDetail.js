import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetail } from "../api/order";

export function useGetOrderDetail(orderId, username) {
  return useQuery({
    queryKey: [username ? username : "self", "order", orderId],
    queryFn: () => fetchOrderDetail(orderId),
  });
}
