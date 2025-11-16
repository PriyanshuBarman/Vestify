import { useQuery } from "@tanstack/react-query";
import { fetchSessions } from "../api/account";

export function useGetSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
    staleTime: 0,
  });
}
