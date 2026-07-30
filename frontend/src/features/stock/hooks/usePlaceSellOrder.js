import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { playPaymentSuccessSound } from "@/utils/sound";

import { placeSellOrder } from "../api/stock";
import { getOrderSuccessItems } from "../utils/orderUtils";

const orderTitleConfig = {
  REGULAR: "Sell order placed",
  GTT: "Sell trigger order placed",
  SL: "Sell stoploss order placed",
};

export function usePlaceSellOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userKey = "self";

  return useMutation({
    mutationFn: placeSellOrder,
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
        error?.response?.data?.message || "Failed to place sell order",
      );
    },
  });
}
