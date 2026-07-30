import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { playPaymentSuccessSound } from "@/utils/sound";

import { modifyOrder } from "../api/stock";
import { getOrderSuccessItems } from "../utils/orderUtils";

export function useModifyOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userKey = "self";

  return useMutation({
    mutationFn: modifyOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "orders"],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "open-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "today-orders"],
      });

      playPaymentSuccessSound();
      navigate("/success", {
        state: {
          title:
            order.type === "GTT" ? "Trigger order modified" : "Order Modified",
          cardTitle: order.name,
          orderDetailsLink: `/stocks/orders/${order.id}`,
          doneLink: "/stocks#orders",
          items: getOrderSuccessItems(order),
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to modify order");
    },
  });
}
