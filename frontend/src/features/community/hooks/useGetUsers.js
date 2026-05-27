import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchUsers } from "../api/community";

export function useGetUsers({ sortBy = "updatedAt" } = {}) {
  const LIMIT = 20;

  return useInfiniteQuery({
    queryKey: ["community", "users", sortBy],
    queryFn: ({ pageParam = 0 }) => {
      return fetchUsers({ pageParam, LIMIT, sortBy });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const users = lastPage?.users;
      if (!users || users.length < LIMIT) return undefined;
      return allPages.length * LIMIT;
    },
    staleTime: 0,
  });
}
