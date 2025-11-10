import { requestEmailChange } from "@/api/account";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function useRequestEmailChange() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: requestEmailChange,
    onSuccess: (data, variables) => {
      const { newEmail, password } = variables;
      navigate("/verify-email-change-otp", {
        state: { newEmail, password },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to request email change",
      );
    },
  });
}
