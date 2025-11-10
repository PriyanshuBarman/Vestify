import { claimDailyReward } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";

export function useClaimDailyReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: claimDailyReward,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (old) => ({
        ...old,
        balance: data.updatedBalance,
      }));

      localStorage.setItem(
        "lastRewardedAt",
        formatDate(new Date(), "yyyy-MM-dd"),
      );
    },
    onError: (error) => {
      if (error.response.data.message === "Already rewarded today") {
        localStorage.setItem(
          "lastRewardedAt",
          formatDate(new Date(), "yyyy-MM-dd"),
        );
      }
    },
  });
}
