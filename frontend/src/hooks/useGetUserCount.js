import { fetchUserCount } from "@/api/landing";
import { useQuery } from "@tanstack/react-query";

export function useUserCount() {
  return useQuery({
    queryKey: ["user-count"],
    queryFn: fetchUserCount,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
