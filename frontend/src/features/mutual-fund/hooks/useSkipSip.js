import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { skipSip } from "../api/sip";

export function useSkipSip() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: skipSip,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["sip", variables.sipId] });

      navigate("/success", {
        state: {
          title: "SIP Skipped Successfully",
          notice:
            variables.diff <= 2 &&
            "Your next SIP installment is within the next 2 days, so it can’t beskipped. The following installment will be skipped instead.",
          doneRoute: "/mutual-funds/#sips",
        },
        replace: true,
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
