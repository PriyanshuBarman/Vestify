import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createInvestOrder } from "../api/order";
import { formatToINR } from "@/utils/formatters";
import { playPaymentSuccessSound } from "@/utils/sound";

export function useCreateInvestOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvestOrder,
    onSuccess: (order) => {
      queryClient.setQueryData(["order", order.id], order);
      queryClient.setQueryData(["orders"], (old) =>
        old ? [order, ...old] : [order],
      );
      queryClient.setQueryData(["pending-orders"], (old) =>
        old ? [order, ...old] : [order],
      );

      playPaymentSuccessSound();
      navigate("/success", {
        state: {
          amount: order.amount,
          title: "Order Placed",
          description: `Investment of ${formatToINR(order.amount)} in ${order.fundName}.`,
          orderDetailsRoute: `/mutual-funds/orders/${order.id}`,
          doneRoute: "/mutual-funds#explore",
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
