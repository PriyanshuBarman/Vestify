import { useQuery } from "@tanstack/react-query";

import { fetchAmcFunds } from "../api/external";

export function useGetAmcFunds(amcCode) {
  return useQuery({
    queryKey: ["mutual-funds", "amc-funds", amcCode],
    queryFn: () => fetchAmcFunds(amcCode),
  });
}
