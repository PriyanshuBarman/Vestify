import { formatToINR } from "@/utils/formatters";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { sendMoney } from "../api/wallet";
import { playPaymentSuccessSound } from "@/utils/sound";

export const useSendMoney = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: sendMoney,
    onSuccess: (data, variables) => {
      const { amount, name } = variables;
      playPaymentSuccessSound();
      navigate("/payment-success", {
        state: {
          amount,
          title: "Payment Successful",
          description: `${formatToINR(amount)} has been successfully sent to ${name}.`,
          doneRoute: "/wallet",
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
