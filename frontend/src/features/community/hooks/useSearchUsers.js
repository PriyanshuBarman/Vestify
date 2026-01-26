import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/community";

export function useSearchUsers(query) {
  return useQuery({
    queryKey: ["community", "users", "search", query],
    queryFn: () => searchUsers({ query, LIMIT: 10 }),
    enabled: !!query,
    staleTime: 0,
  });
}
