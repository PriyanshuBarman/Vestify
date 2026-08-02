import { useQuery } from "@tanstack/react-query";

import { fetchIndices } from "../api/stock";

export function useGetIndices() {
  return useQuery({
    queryKey: ["stocks", "indices"],
    queryFn: fetchIndices,
    placeholderData: {},
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
