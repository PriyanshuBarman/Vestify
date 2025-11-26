import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deleteSip } from "../api/sip";

export function useDeleteSip() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteSip,
    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["sip", variables.sipId] });

      navigate("/mutual-funds/#sips");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error deleting SIP");
    },
  });
}
