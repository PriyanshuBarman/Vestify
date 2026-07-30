import { useQuery } from "@tanstack/react-query";

import { fetchMangerFunds } from "../api/external";

export function useGetManagerFunds(managerName) {
  return useQuery({
    queryKey: ["mutual-funds", "manager-funds", managerName],
    queryFn: () => fetchMangerFunds(managerName),
  });
}
