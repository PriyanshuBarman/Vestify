import { useQuery } from "@tanstack/react-query";
import { fetchFundOrders } from "../api/order";

/**
 returns only the COMPLETED orders for the schemeCode
 **/

export function useGetFundOrders(schemeCode, userId) {
  return useQuery({
    queryKey: ["fund-orders", schemeCode, userId],
    queryFn: () => fetchFundOrders(schemeCode, userId),
    staleTime: 0,
    gcTime: 0,
  });
}
