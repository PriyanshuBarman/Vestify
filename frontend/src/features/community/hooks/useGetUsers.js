import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers, searchUsers } from "../api/community";

export function useGetUsers() {
  const LIMIT = 20;

  return useInfiniteQuery({
    queryKey: ["community", "users"],
    queryFn: ({ pageParam = 0 }) => {
      return fetchUsers({ pageParam, LIMIT });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const users = lastPage?.users;
      if (!users || users.length < LIMIT) return undefined;
      return allPages.length * LIMIT;
    },
  });
}
