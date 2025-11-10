import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { logoutUser } from "../api/auth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      localStorage.clear();
      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
}
