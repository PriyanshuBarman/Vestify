import { useQuery } from "@tanstack/react-query";
import { fetchSearchResults } from "../api/search";

export function useGetSearchResults(query, type) {
  return useQuery({
    queryKey: ["search", query, type],
    queryFn: () => fetchSearchResults(query, type),
    enabled: query?.length > 2,
  });
}
