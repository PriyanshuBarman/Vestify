import { changePassword } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useChangePassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
}
