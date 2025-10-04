import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createSip } from "../api/sip";
import { formatToINR } from "@/utils/formatters";

export function useCreateSip() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSip,
    onSuccess: (data, variables) => {
      const { amount, fund } = variables;
      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(data.message);
      navigate("/payment-success", {
        state: {
          amount,
          title: "SIP Order Placed",
          description: `SIP of ${formatToINR(amount)} in ${fund.short_name}.`,
          orderDetailsRoute: "/mutual-funds/#sips",
          doneRoute: "/mutual-funds#sips",
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
