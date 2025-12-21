import { fetchBalance } from "@/api/wallet";
import { useQuery } from "@tanstack/react-query";

export function useGetBalance() {
  return useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
    staleTime: 0,
  });
}
