import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { formatToINR } from "@/utils/formatters";

import { redeemFund } from "../api/order";

export function useRedeemFund() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userKey = "self";

  return useMutation({
    mutationFn: redeemFund,
    onSuccess: (order) => {
      queryClient.invalidateQueries({
        queryKey: [userKey, "mutual-funds", "portfolio"],
      });
      queryClient.setQueryData(
        [userKey, "mutual-funds", "order", order.id],
        order,
      );
      queryClient.setQueryData([userKey, "mutual-funds", "orders"], (old) =>
        old ? [order, ...old] : [order],
      );
      queryClient.setQueryData(
        [userKey, "mutual-funds", "pending-orders"],
        (old) => (old ? [order, ...old] : [order]),
      );

      navigate("/success", {
        state: {
          title: "Redeem Order Placed",
          cardTitle: order.fundName,
          orderDetailsLink: `/mutual-funds/orders/${order.id}`,
          doneLink: "/mutual-funds#investments",
          items: [
            {
              label: "Amount",
              value: formatToINR(order.amount),
            },
            {
              label: "Expected NAV date",
              value: formatDate(order.navDate, "dd MMM yy"),
            },
            {
              label: "Expected allotment date",
              value: formatDate(order.processDate, "dd MMM yy"),
            },
          ],
        },
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
