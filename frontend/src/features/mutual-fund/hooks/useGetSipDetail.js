import { useQuery } from "@tanstack/react-query";

import { fetchSipDetail } from "../api/sip";

export function useGetSipDetail(sipId, username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "sip", sipId],
    queryFn: () => fetchSipDetail(sipId, username),
    staleTime: 0,
  });
}
