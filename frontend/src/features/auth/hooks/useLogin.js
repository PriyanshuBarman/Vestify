import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { loginUser } from "../api/auth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
  });
}
