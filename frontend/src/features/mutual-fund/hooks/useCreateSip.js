import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate, setDate } from "date-fns";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { formatToINR } from "@/utils/formatters";
import { playPaymentSuccessSound } from "@/utils/sound";

import { createSip } from "../api/sip";

export function useCreateSip() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userKey = "self";

  return useMutation({
    mutationFn: createSip,
    onSuccess: (data) => {
      const { order, sip } = data;

      queryClient.setQueryData([userKey, "mutual-funds", "sips"], (old) => {
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

      playPaymentSuccessSound();
      navigate("/success", {
        state: {
          title: "SIP Order Placed",
          cardTitle: order.fundName,
          orderDetailsLink: `/mutual-funds/orders/${order.id}`,
          doneLink: "/mutual-funds#sips",
          items: [
            {
              label: "Installment Amount",
              value: formatToINR(sip.amount),
            },
            {
              label: "SIP date",
              value: `${formatDate(setDate(new Date(), sip.sipDate), "do")} of every month`,
            },
            {
              label: "Next Installment",
              value: formatDate(sip.nextInstallmentDate, "dd MM"),
            },
          ],
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
