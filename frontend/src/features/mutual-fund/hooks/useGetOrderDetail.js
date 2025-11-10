import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetail } from "../api/order";

export function useGetOrderDetail(orderId) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderDetail(orderId),
  });
}
