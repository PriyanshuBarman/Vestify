import { useQuery } from "@tanstack/react-query";

import { fetchTopByVolume } from "../api/stock";

export function useGetTopByVolume(index) {
  return useQuery({
    queryKey: ["stocks", "top-by-volume", index],
    queryFn: () => fetchTopByVolume(index),
    placeholderData: [{}, {}, {}, {}],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
