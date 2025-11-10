import { useQuery } from "@tanstack/react-query";
import { fetchSips } from "../api/sip";

export function useGetSips() {
  return useQuery({
    queryKey: ["sips"],
    queryFn: fetchSips,
  });
}
