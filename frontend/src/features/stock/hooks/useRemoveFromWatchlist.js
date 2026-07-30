import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeFromWatchlist } from "../api/watchlist";

export function useRemoveFromWatchlist({ showToast = true } = {}) {
  const queryClient = useQueryClient();
  const userKey = "self";

  return useMutation({
    mutationFn: removeFromWatchlist,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["stocks", "is-in-watchlist", variables.symbol],
      });
      await queryClient.cancelQueries({
        queryKey: [userKey, "stocks", "watchlist"],
      });

      const previousIsInWatchlist = queryClient.getQueryData([
        "stocks",
        "is-in-watchlist",
        variables.symbol,
      ]);
      const previousWatchlist = queryClient.getQueryData([
        userKey,
        "stocks",
        "watchlist",
      ]);

      queryClient.setQueryData(
        ["stocks", "is-in-watchlist", variables.symbol],
        false,
      );

      if (previousWatchlist) {
        queryClient.setQueryData([userKey, "stocks", "watchlist"], (old = []) =>
          old.filter((item) => item.symbol !== variables.symbol),
        );
      }

      if (showToast) {
        toast.success("Removed from watchlist");
      }

      return { previousIsInWatchlist, previousWatchlist, variables };
    },

    onError: (error, variables, context) => {
      if (context) {
        queryClient.setQueryData(
          ["stocks", "is-in-watchlist", context.variables.symbol],
          context.previousIsInWatchlist,
        );
        if (context.previousWatchlist !== undefined) {
          queryClient.setQueryData(
            [userKey, "stocks", "watchlist"],
            context.previousWatchlist,
          );
        }
      }
      toast.error(
        error.response?.data?.message || "Error removing from watchlist",
      );
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["stocks", "is-in-watchlist", variables.symbol],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "watchlist"],
      });
    },
  });
}
