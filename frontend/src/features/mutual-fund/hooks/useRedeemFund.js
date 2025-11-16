import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { redeemFund } from "../api/order";

export function useRedeemFund() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: redeemFund,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.setQueryData(["order", order.id], order);
      queryClient.setQueryData(["orders"], (old) =>
        old ? [order, ...old] : [order],
      );
      queryClient.setQueryData(["pending-orders"], (old) =>
        old ? [order, ...old] : [order],
      );

      navigate("/mutual-funds/redeem-success", {
        state: order,
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to process redemption. Please try again.",
      );
    },
  });
}
