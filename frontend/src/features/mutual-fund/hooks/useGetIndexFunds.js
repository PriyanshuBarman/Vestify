import { useQuery } from "@tanstack/react-query";
import { fetchIndexFunds } from "../api/external";

export function useGetIndexFunds() {
  return useQuery({
    queryKey: ["indexFunds"],
    queryFn: fetchIndexFunds,
  });
}
