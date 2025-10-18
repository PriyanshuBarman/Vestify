import { setPin } from "@/api/user";
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
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
