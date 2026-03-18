import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { verifyEmailChangeOTP } from "@/api/account";

export function useVerifyEmailChangeOTP() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyEmailChangeOTP,
    onSuccess: (newEmail) => {
      toast.success(newEmail || "Email changed successfully");
      navigate("/account-details", { replace: true });
      queryClient.setQueryData(["user"], (user) => {
        return {
          ...user,
          email: newEmail,
        };
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to verify email");
    },
  });
}
