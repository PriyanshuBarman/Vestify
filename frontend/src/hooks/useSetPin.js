import { setPin } from "@/api/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useSetPin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPin,
    onSuccess: () => {
      queryClient.setQueryData(["user"], (prev) => {
        return { ...prev, hasPin: true };
      });
      navigate("/mutual-funds#explore", { replace: true });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "";
      const isAuthError =
        error.response?.status === 401 ||
        message.toLowerCase().includes("refresh token is required") ||
        message.toLowerCase().includes("prisma");

      if (isAuthError) {
        return navigate("/auth/help");
      }
      toast.error(message || "Something went wrong");
    },
  });
}
