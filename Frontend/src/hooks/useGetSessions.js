import { fetchSessions } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useGetSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
    staleTime: 0,
  });
}
