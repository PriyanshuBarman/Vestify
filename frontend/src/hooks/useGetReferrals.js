import { fetchReferrals } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useGetReferrals() {
  return useQuery({
    queryKey: ["referrals"],
    queryFn: fetchReferrals,
    staleTime: 0,
    gcTime: 0,
  });
}
