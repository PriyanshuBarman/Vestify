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
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
