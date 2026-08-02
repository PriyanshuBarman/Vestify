import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addToWatchlist } from "../api/watchlist";

export function useAddStockToWatchlist({ showToast = true } = {}) {
  const queryClient = useQueryClient();
  const userKey = "self";

  return useMutation({
    mutationFn: addToWatchlist,

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
        true,
      );

      if (previousWatchlist) {
        queryClient.setQueryData(
          [userKey, "stocks", "watchlist"],
          (old = []) => {
            if (old.some((item) => item.symbol === variables.symbol))
              return old;
            return [
              ...old,
              {
                id: variables.symbol,
                symbol: variables.symbol,
                name: variables.name,
                shortName: variables.shortName,
              },
            ];
          },
        );
      }

      if (showToast) {
        toast.success("Added to watchlist");
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
      toast.error(error.response?.data?.message || "Error adding to watchlist");
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
