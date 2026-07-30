import { useQuery } from "@tanstack/react-query";

import { fetchFundsByFilter } from "../api/external";

export function useGetFundsByFilter(filters, options) {
  return useQuery({
    queryKey: ["mutual-funds", "fund-by-filter", filters],
    queryFn: () => fetchFundsByFilter(filters),
    ...options,
  });
}
