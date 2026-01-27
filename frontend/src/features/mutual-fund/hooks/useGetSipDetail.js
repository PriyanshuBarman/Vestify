import { useQuery } from "@tanstack/react-query";
import { fetchSipDetail } from "../api/sip";

export function useGetSipDetail(sipId, username) {
  return useQuery({
    queryKey: ["sip", sipId, username ? username : "self"],
    queryFn: () => fetchSipDetail(sipId, username),
    staleTime: 0,
  });
}
