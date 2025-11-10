import { useQuery } from "@tanstack/react-query";
import { fetchFundsByFilter } from "../api/external";

export function useGetFundsByFilter(filters) {
  return useQuery({
    queryKey: ["fundByFilter", filters],
    queryFn: () => fetchFundsByFilter(filters),
  });
}
