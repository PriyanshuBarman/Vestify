import { useQuery } from "@tanstack/react-query";
import { fetchPopularFunds } from "../api/external";

export function useGetPopularFunds() {
  return useQuery({ 
    queryKey: ["popularFunds"], 
    queryFn: fetchPopularFunds
  });
}
