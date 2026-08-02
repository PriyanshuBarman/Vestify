import { useQuery } from "@tanstack/react-query";

import { fetchGainers } from "../api/stock";

export function useGetGainers(index) {
  return useQuery({
    queryKey: ["stocks", "gainers", index],
    queryFn: () => fetchGainers(index),
    placeholderData: [{}, {}, {}, {}],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
