import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { cancelOrder } from "../api/stock";

export function useCancelOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userKey = "self";

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "orders"],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "open-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "today-orders"],
      });
      toast.success("Order cancelled successfully");
      navigate("/stocks#orders", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to cancel order");
    },
  });
}
