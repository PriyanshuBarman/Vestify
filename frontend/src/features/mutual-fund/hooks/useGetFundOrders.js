import { useQuery } from "@tanstack/react-query";
import { fetchFundOrders } from "../api/order";

/**
 returns only the COMPLETED orders for the schemeCode
 **/

export function useGetFundOrders(schemeCode) {
  return useQuery({
    queryKey: ["fund-orders", schemeCode],
    queryFn: () => fetchFundOrders(schemeCode),
    staleTime: 0,
  });
}
