import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { cancelStockSip } from "../api/sip";

export function useCancelSip() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: cancelStockSip,
    onSuccess: (data, variables) => {
      const userKey = "self";
      queryClient.invalidateQueries({ queryKey: [userKey, "stocks", "sips"] });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "sip", variables],
      });
      toast.success(data.message);
      navigate("/stocks/#sips", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to cancel SIP");
    },
  });
}
