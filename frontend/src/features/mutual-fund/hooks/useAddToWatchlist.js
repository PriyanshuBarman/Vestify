import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addToWatchlist } from "../api/watchlist";

export function useAddToWatchlist() {
  const queryClient = useQueryClient();
  const userKey = "self";

  return useMutation({
    mutationFn: addToWatchlist,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [userKey, "isInWatchlist", variables.schemeCode],
      });
      const previousData = queryClient.getQueryData([
        userKey,
        "isInWatchlist",
        variables.schemeCode,
      ]);

      queryClient.setQueryData(
        [userKey, "isInWatchlist", variables.schemeCode],
        true,
      );
      return { previousData, variables };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [userKey, "isInWatchlist", context.variables.schemeCode],
        context.previousData,
      );
      toast.error(error.response?.data?.message || "Error adding to watchlist");
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [userKey, "isInWatchlist", variables.schemeCode],
      });
      queryClient.invalidateQueries({ queryKey: [userKey, "watchlist"] });
    },
  });
}
