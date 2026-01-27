import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/order";

export function useGetOrders(username) {
  return useQuery({
    queryKey: ["orders", username ? username : "self"],
    queryFn: () => fetchOrders(username),
    staleTime: 0,
    gcTime: 0,
  });
}
