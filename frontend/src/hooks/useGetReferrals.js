import { useQuery } from "@tanstack/react-query";

import { fetchReferrals } from "@/api/user";

export function useGetReferrals() {
  return useQuery({
    queryKey: ["referrals"],
    queryFn: fetchReferrals,
    staleTime: 0,
    gcTime: 0,
  });
}
