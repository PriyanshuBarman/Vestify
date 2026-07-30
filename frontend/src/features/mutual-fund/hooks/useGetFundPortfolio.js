import { useQuery } from "@tanstack/react-query";

import { fetchFundPortfolio } from "../api/portfolio";

export function useGetFundPortfolio(schemeCode, username) {
  const userKey = username || "self";

  return useQuery({
    queryKey: [userKey, "mutual-funds", "fund-portfolio", schemeCode],
    queryFn: () => fetchFundPortfolio(schemeCode, username),
  });
}
