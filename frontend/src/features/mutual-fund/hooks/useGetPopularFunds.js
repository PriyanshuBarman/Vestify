import { useQuery } from "@tanstack/react-query";

import { fetchPopularFunds } from "../api/external";

export function useGetPopularFunds() {
  return useQuery({
    queryKey: ["mutual-funds", "popular"],
    queryFn: fetchPopularFunds,
    placeholderData: [{}, {}, {}, {}],
  });
}
