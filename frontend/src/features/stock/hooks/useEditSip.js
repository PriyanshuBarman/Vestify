import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { editStockSip } from "../api/sip";

export function useEditSip() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: editStockSip,
    onSuccess: (data, variables) => {
      const userKey = "self";
      queryClient.invalidateQueries({ queryKey: [userKey, "stocks", "sips"] });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "sip", variables.sipId],
      });

      navigate("/success", {
        state: {
          title: data?.notice
            ? "SIP Edit Requested"
            : "SIP Updated Successfully",
          description: data.message,
          doneLink: "/stocks#sips",
          notice: data?.notice,
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to edit SIP");
    },
  });
}
