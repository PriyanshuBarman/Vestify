import { useQuery } from "@tanstack/react-query";
import { fetchFundOrders } from "../api/order";

export function useGetFundOrders(schemeCode) {
  return useQuery({
    queryKey: ["fund-orders", schemeCode],
    queryFn: () => fetchFundOrders(schemeCode),
  });
}
