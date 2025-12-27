import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeStepUp } from "../api/sip";

export function useRemoveStepUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeStepUp,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sip", variables.sipId] });
      toast.success("Step-up removed successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
