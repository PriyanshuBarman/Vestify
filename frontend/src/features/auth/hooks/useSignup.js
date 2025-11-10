import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { signupUser } from "../api/auth";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/auth/pin-setup");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
  });
}
