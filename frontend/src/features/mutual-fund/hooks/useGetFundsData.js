import { useQueries } from "@tanstack/react-query";
import { fetchFund } from "../api/external";

/**
 * @param {string[]} schemeCodes - array of schemeCodes
 * @returns {string[]} - array of fund datas
 */

export function useGetFundsData(schemeCodes) {
  const queries = useQueries({
    queries: schemeCodes.map((code) => ({
      queryKey: ["fund", parseInt(code)],
      queryFn: () => fetchFund(code),
      retry: 3,
      retryDelay: 5000,
    })),
  });

  // Combine results into one array
  const data = queries.map((q) => q.data).filter(Boolean);

  return {
    data,
    // isLoading
  };
}
