import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { skipSip } from "../api/sip";

export function useSkipSip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: skipSip,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["sip", data.sipId] });
    },
    onError: (error) => {
      toast.error(
        error.status === 500
          ? "Something went wrong"
          : error.response?.data?.message,
      );
    },
  });
}
