import { useQuery } from "@tanstack/react-query";
import { fetchSips } from "../api/sip";

export function useGetSips(userId) {
  return useQuery({
    queryKey: ["sips", userId],
    queryFn: () => fetchSips(userId),
    staleTime: 0,
  });
}
