import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { deleteSip } from "../api/sip";

export function useCancelSip() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userKey = "self";

  return useMutation({
    mutationFn: deleteSip,
    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [userKey, "sips"] });
      queryClient.invalidateQueries({
        queryKey: [userKey, "sip", variables.sipId],
      });

      navigate("/mutual-funds/#sips", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error deleting SIP");
    },
  });
}
