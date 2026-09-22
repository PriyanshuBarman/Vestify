import { useQuery } from "@tanstack/react-query";

import { getStockSipDetail } from "../api/sip";

export function useGetSipDetail(sipId, username) {
  const userKey = username || "self";
  return useQuery({
    queryKey: [userKey, "stocks", "sip", sipId],
    queryFn: () => getStockSipDetail(sipId, username),
    enabled: !!sipId,
  });
}
