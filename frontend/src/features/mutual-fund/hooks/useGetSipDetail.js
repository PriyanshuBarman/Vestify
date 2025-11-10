import { useQuery } from "@tanstack/react-query";
import { fetchSipDetail } from "../api/sip";

export function useGetSipDetail(sipId) {
  return useQuery({
    queryKey: ["sip", sipId],
    queryFn: () => fetchSipDetail(sipId),
  });
}
