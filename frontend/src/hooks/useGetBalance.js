import { useQuery } from "@tanstack/react-query";

import { fetchBalance } from "@/api/wallet";

export function useGetBalance() {
  return useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
    staleTime: 0,
  });
}
