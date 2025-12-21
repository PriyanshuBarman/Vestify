import { useQuery } from "@tanstack/react-query";
import { fetchPendingOrders } from "../api/order";

export function useGetPendingOrders() {
  return useQuery({
    queryKey: ["pending-orders"],
    queryFn: fetchPendingOrders,
    staleTime: 0,
  });
}
