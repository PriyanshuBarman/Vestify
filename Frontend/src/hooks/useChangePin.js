import { changePin } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useChangePin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: changePin,
    onSuccess: () => {
      toast.success("Pin changed successfully");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
}
