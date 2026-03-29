import { useQuery } from "@tanstack/react-query";

import { fetchFundOrders } from "../api/order";

/**
 returns only the COMPLETED orders for the schemeCode
 **/

export function useGetFundOrders(schemeCode, username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "fund-orders", schemeCode],
    queryFn: () => fetchFundOrders(schemeCode, username),
    staleTime: 0,
    gcTime: 0,
  });
}
