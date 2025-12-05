import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPopularFunds } from "../api/external";
import { fetchBalance } from "@/api/wallet";
import { fetchPortfolio } from "../api/portfolio";

export function useGetPopularFunds() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["popularFunds"],
    queryFn: () => {
      queryClient.prefetchQuery({
        queryKey: ["mfPortfolio"],
        queryFn: fetchPortfolio,
      });

      return fetchPopularFunds();
    },
    placeholderData: [{}, {}, {}, {}],
  });
}
