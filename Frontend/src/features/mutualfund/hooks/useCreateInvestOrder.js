import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createInvestOrder } from "../api/order";
import { formatToINR } from "@/utils/formatters";

export function useCreateInvestOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvestOrder,
    onSuccess: (orderDetail, variables) => {
      const { amount, fund } = variables;
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/payment-success", {
        state: {
          amount,
          title: "Order Placed",
          description: `Investment of ${formatToINR(amount)} in ${fund.short_name}.`,
          orderDetailsRoute: "/mutual-funds/order/" + orderDetail.id,
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
