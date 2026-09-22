import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { addSuffix } from "@/features/mutual-fund/utils/formaters";
import { formatToINR } from "@/utils/formatters";

import { createStockSip } from "../api/sip";

const WEEKDAY_NAMES = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
};

export function useCreateSip() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createStockSip,
    onSuccess: (data) => {
      const userKey = "self";
      queryClient.invalidateQueries({ queryKey: [userKey, "stocks", "sips"] });

      const { sip } = data;
      const amountValue =
        sip.type === "AMOUNT"
          ? formatToINR(sip.amount)
          : `${sip.quantity} shares`;
      const dateText =
        sip.frequency === "MONTHLY"
          ? `${addSuffix(sip.sipDate)} of every month`
          : `Every ${WEEKDAY_NAMES[sip.sipDate]}`;

      navigate("/success", {
        state: {
          title: "Stock SIP Created",
          cardTitle: sip.name || sip.shortName || sip.symbol,
          doneLink: "/stocks#sips",
          items: [
            {
              label: "Installment",
              value: amountValue,
            },
            {
              label: "Frequency",
              value: dateText,
            },
            {
              label: "Next Installment",
              value: format(new Date(sip.nextInstallmentDate), "do MMM, yyyy"),
            },
          ],
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to create SIP");
    },
  });
}
