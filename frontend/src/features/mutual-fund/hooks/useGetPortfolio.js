import { useQuery } from "@tanstack/react-query";
import { fetchPortfolio } from "../api/portfolio";

export function useGetPortfolio(username) {
  return useQuery({
    queryKey: ["mfPortfolio", username ? username : "self"],
    queryFn: () => fetchPortfolio(username),
    ...(username && { staleTime: 0 }),
  });
}
