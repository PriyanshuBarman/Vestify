import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { dismissAnnouncement } from "@/api/announcement";

export function useDismisAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dismissAnnouncement,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["announcements"],
      });
      const prevAnnouncements = queryClient.getQueryData(["announcements"]);
      queryClient.setQueryData(
        ["announcements"],
        prevAnnouncements.filter((a) => a.id !== variables.id),
      );

      return { prevAnnouncements, variables };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ["announcements", context.variables.id],
        context.prevAnnouncements,
      );
      toast.error("Error removing announcement");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["announcements"]);
    },
  });
}
