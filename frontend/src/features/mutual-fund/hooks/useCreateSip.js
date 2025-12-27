import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createSip } from "../api/sip";
import { formatToINR } from "@/utils/formatters";
import { playPaymentSuccessSound } from "@/utils/sound";

export function useCreateSip() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSip,
    onSuccess: (data) => {
      const { order, sip } = data;

      queryClient.setQueryData(["sips"], (old) => {
        if (!old) {
          return {
            sips: [sip],
            totalActiveSipAmount: sip.amount,
          };
        }
        return {
          sips: [sip, ...old.sips],
          totalActiveSipAmount:
            (old.totalActiveSipAmount || 0) + Number(sip.amount),
        };
      });

      queryClient.setQueryData(["order", order.id], order);
      queryClient.setQueryData(["orders"], (old) =>
        old ? [order, ...old] : [order],
      );
      queryClient.setQueryData(["pending-orders"], (old) =>
        old ? [order, ...old] : [order],
      );
      queryClient.invalidateQueries({ queryKey: ["sips"] });

      playPaymentSuccessSound();
      navigate("/success", {
        state: {
          amount: order.amount,
          title: "SIP Order Placed",
          description: `SIP of ${formatToINR(order.amount)} in ${order.fundName}.`,
          orderDetailsRoute: `/mutual-funds/orders/${order.id}`,
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
