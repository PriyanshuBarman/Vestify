import { useQuery } from "@tanstack/react-query";
import { fetchFund } from "../api/external";

export function useGetFundData(schemeCode) {
  return useQuery({
    queryKey: ["fund", Number(schemeCode)],
    queryFn: () => fetchFund(schemeCode),
  });
}
