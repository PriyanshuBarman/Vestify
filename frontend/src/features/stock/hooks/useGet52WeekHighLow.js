import { useQuery } from "@tanstack/react-query";

import { fetch52WeekHighLow } from "../api/stock";

export function useGet52WeekHighLow(index) {
  return useQuery({
    queryKey: ["stocks", "52-week-high-low", index],
    queryFn: () => fetch52WeekHighLow(index),
    placeholderData: {
      highs: [{}, {}, {}, {}],
      lows: [{}, {}, {}, {}],
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
}
