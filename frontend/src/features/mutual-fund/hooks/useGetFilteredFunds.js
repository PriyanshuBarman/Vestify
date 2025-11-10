import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFilteredFunds } from "../api/external";

export function useGetFilteredFunds(filters) {
  const LIMIT = 20;

  return useInfiniteQuery({
    queryKey: ["filteredFunds", filters],
    queryFn: ({ pageParam = 0 }) => {
      return fetchFilteredFunds({ pageParam, filters, LIMIT });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * LIMIT;
      return lastPage.funds.length === LIMIT ? nextOffset : undefined;
    },
  });
}
