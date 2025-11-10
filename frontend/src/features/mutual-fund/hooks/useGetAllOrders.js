import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/order";

export function useGetAllOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
}
