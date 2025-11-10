import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { editSip } from "../api/sip";

export function useEditSip() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editSip,
    onSuccess: (data, variables) => {
      toast.success(data.message);
      navigate("/mutual-funds/#sips", {
        replace: true,
      });
      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["sip", variables.sipId] });
    },
    onError: (error) => {
      toast.error(
        error.status === 500
          ? "Something went wrong"
          : error.response?.data?.message,
      );
    },
  });
}
