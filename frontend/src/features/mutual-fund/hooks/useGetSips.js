import { useQuery } from "@tanstack/react-query";
import { fetchSips } from "../api/sip";

export function useGetSips(username) {
  return useQuery({
    queryKey: ["sips", username ? username : "self"],
    queryFn: () => fetchSips(username),
    staleTime: 0,
  });
}
