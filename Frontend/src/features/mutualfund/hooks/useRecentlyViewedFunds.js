import { useQueryClient } from "@tanstack/react-query";

export const useRecentlyViewedFunds = (limit = 4) => {
  const queryClient = useQueryClient();

  const funds = queryClient
    .getQueryCache()
    .getAll()
    .filter(
      (item) => item.queryKey && item.queryKey[0] === "fund" && item.state.data,
    )
    .sort((a, b) => b.state.dataUpdatedAt - a.state.dataUpdatedAt)
    .slice(0, limit)
    .map((q) => q.state.data);
  return funds;
};
