import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { playPaymentSuccessSound } from "@/utils/sound";

import { placeBuyOrder } from "../api/stock";
import { getOrderSuccessItems } from "../utils/orderUtils";

const orderTitleConfig = {
  REGULAR: "Buy order placed",
  GTT: "Buy trigger order placed",
};

export function usePlaceBuyOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userKey = "self";

  return useMutation({
    mutationFn: placeBuyOrder,
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
      queryClient.invalidateQueries({
        queryKey: [userKey, "stocks", "portfolio"],
      });

      playPaymentSuccessSound();
      navigate("/success", {
        state: {
          title: orderTitleConfig[order.type],
          cardTitle: order.name, // stock name
          orderDetailsLink: `/stocks/orders/${order.id}`,
          doneLink: "/stocks#orders",
          items: getOrderSuccessItems(order),
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to place buy order",
      );
    },
  });
}
