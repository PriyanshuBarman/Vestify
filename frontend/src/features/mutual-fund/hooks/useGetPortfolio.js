import { useQuery } from "@tanstack/react-query";
import { fetchPortfolio } from "../api/portfolio";

export function useGetPortfolio() {
  return useQuery({
    queryKey: ["mfPortfolio"],
    queryFn: fetchPortfolio,
  });
}
