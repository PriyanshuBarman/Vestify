import { useQuery } from "@tanstack/react-query";
import { fetchMangerFunds } from "../api/external";

export function useGetManagerFunds(managerName) {
  return useQuery({
    queryKey: ["managerFunds", managerName],
    queryFn: () => fetchMangerFunds(managerName),
  });
}
