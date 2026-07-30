import { useQuery } from "@tanstack/react-query";

import { fetchIndices } from "../api/stock";

export function useGetIndices(symbols) {
  return useQuery({
    queryKey: ["stocks", "indices", symbols],
    queryFn: () => fetchIndices(symbols),
    placeholderData: {},
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
}
