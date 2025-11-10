import { useQuery } from "@tanstack/react-query";
import { fetchTrendingSearches } from "../api/search";

export function useGetTrendingSearches() {
  return useQuery({
    queryKey: ["popularFunds"],
    queryFn: fetchTrendingSearches,
  });
}
