import { useQuery } from "@tanstack/react-query";
import { fetchFundsByFilter } from "../api/external";

export function useGetFundsByFilter(filters, options) {
  return useQuery({
    queryKey: ["fundByFilter", filters],
    queryFn: () => fetchFundsByFilter(filters),
    ...options,
  });
}
