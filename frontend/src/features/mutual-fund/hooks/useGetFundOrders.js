import { useQuery } from "@tanstack/react-query";
import { fetchFundOrders } from "../api/order";

/**
 returns only the COMPLETED orders for the schemeCode
 **/

export function useGetFundOrders(schemeCode, username) {
  return useQuery({
    queryKey: ["fund-orders", schemeCode, username ? username : "self"],
    queryFn: () => fetchFundOrders(schemeCode, username),
    staleTime: 0,
    gcTime: 0,
  });
}
