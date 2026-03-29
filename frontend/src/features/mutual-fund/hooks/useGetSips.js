import { useQuery } from "@tanstack/react-query";

import { fetchSips } from "../api/sip";

export function useGetSips(username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "sips"],
    queryFn: () => fetchSips(username),
    ...(username && { staleTime: 0 }),
  });
}
