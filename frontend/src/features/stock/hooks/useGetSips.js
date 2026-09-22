import { useQuery } from "@tanstack/react-query";

import { getAllStockSips } from "../api/sip";

export function useGetSips(username) {
  const userKey = username || "self";
  return useQuery({
    queryKey: [userKey, "stocks", "sips"],
    queryFn: () => getAllStockSips(username),
  });
}
