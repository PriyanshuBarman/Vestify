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
          doneLink: "/mutual-funds/#sips",
          notice: data?.notice,
        },
        replace: true,
      });

      queryClient.invalidateQueries({
        queryKey: [userKey, "mutual-funds", "sips"],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "mutual-funds", "sip", variables.sipId],
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
