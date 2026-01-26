import { useQuery } from "@tanstack/react-query";
import { fetchSipDetail } from "../api/sip";

export function useGetSipDetail(sipId, userId) {
  return useQuery({
    queryKey: ["sip", sipId, userId],
    queryFn: () => fetchSipDetail(sipId, userId),
    staleTime: 0,
  });
}
