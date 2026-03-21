import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteAllSessions } from "@/api/session";

export function useDeleteAllSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllSessions,
    onSuccess: () => {
      queryClient.invalidateQueries(["sessions"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
