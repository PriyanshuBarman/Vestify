import { useQuery } from "@tanstack/react-query";

import { fetchGainers } from "../api/stock";

export function useGetGainers() {
  return useQuery({
    queryKey: ["gainers"],
    queryFn: fetchGainers,
    placeholderData: [{}, {}, {}, {}],
    staleTime: 5 * 60 * 1000,
  });
}
