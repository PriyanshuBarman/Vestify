import { useQuery } from "@tanstack/react-query";

import { fetchChartData } from "../api/external";

export function useGetChart(schemeCode) {
  return useQuery({
    queryKey: ["mutual-funds", "chart", Number(schemeCode)],
    queryFn: () => fetchChartData(schemeCode),
  });
}
