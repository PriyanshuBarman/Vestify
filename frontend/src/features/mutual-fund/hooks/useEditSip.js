import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { editSip } from "../api/sip";

export function useEditSip() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userKey = "self";

  return useMutation({
    mutationFn: editSip,
    onSuccess: (data, variables) => {
      navigate("/success", {
        state: {
          title: data?.notice
            ? "SIP Edit Requested"
            : "SIP Updated Successfully",
          description: data.message,
          notice: data?.notice,
          doneRoute: "/mutual-funds/#sips",
          icon: data?.notice ? "arrow" : "check",
        },
        replace: true,
      });

      queryClient.invalidateQueries({ queryKey: [userKey, "sips"] });
      queryClient.invalidateQueries({
        queryKey: [userKey, "sip", variables.sipId],
      });
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
