import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeFromWatchlist } from "../api/watchlist";

export function useRemoveFundFromWatchlist({ showToast = true } = {}) {
  const queryClient = useQueryClient();
  const userKey = "self";

  return useMutation({
    mutationFn: removeFromWatchlist,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["mutual-funds", "is-in-watchlist", variables.schemeCode],
      });
      await queryClient.cancelQueries({
        queryKey: [userKey, "mutual-funds", "watchlist"],
      });

      const previousIsInWatchlist = queryClient.getQueryData([
        "mutual-funds",
        "is-in-watchlist",
        variables.schemeCode,
      ]);
      const previousWatchlist = queryClient.getQueryData([
        userKey,
        "mutual-funds",
        "watchlist",
      ]);

      queryClient.setQueryData(
        ["mutual-funds", "is-in-watchlist", variables.schemeCode],
        false,
      );

      if (previousWatchlist) {
        queryClient.setQueryData(
          [userKey, "mutual-funds", "watchlist"],
          (old = []) =>
            old.filter((item) => item.schemeCode !== variables.schemeCode),
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
          ["mutual-funds", "is-in-watchlist", context.variables.schemeCode],
          context.previousIsInWatchlist,
        );
        if (context.previousWatchlist !== undefined) {
          queryClient.setQueryData(
            [userKey, "mutual-funds", "watchlist"],
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
        queryKey: ["mutual-funds", "is-in-watchlist", variables.schemeCode],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "mutual-funds", "watchlist"],
      });
    },
  });
}
