import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeStepUp } from "../api/sip";

export function useRemoveStepUp() {
  const queryClient = useQueryClient();
  const userKey = "self";

  return useMutation({
    mutationFn: removeStepUp,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [userKey, "sip", variables.sipId],
      });
      toast.success("Step-up removed successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
