import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { addStepUp } from "../api/sip";
import { formatToINR } from "@/utils/formatters";

export function useAddStepUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStepUp,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["sip", variables.sipId], (old) => {
        return { ...old, sip: data };
      });

      const stepUpDate = formatDate(data.nextStepUpDate, "MMM yy");
      const stepUpValue = data?.stepUpAmount
        ? Number(data.amount) + Number(data.stepUpAmount)
        : Number(data.amount) +
          (Number(data.amount) * Number(data.stepUpPercentage)) / 100;

      navigate("/success", {
        state: {
          title: variables.isEdit ? "Step-up Updated" : "Step-up Activated",
          description: `SIP amount will increace to ${formatToINR(stepUpValue)} from ${stepUpDate} onwards`,
          doneRoute: `/mutual-funds/sip/${variables.sipId}`,
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
