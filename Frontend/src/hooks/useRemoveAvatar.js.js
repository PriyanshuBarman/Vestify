import { removeAvatar, updateProfile } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Optimistic update
export function useRemoveAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAvatar,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user"] });

      const previousValue = queryClient.getQueryData(["user"]);

      queryClient.setQueryData(["user"], (user) => {
        return {
          ...user,
          profile: {
            ...user.profile,
            avatar: null,
          },
        };
      });

      return { previousValue };
    },

    onError: (error, variables, context) => {
      if (context?.previousValue) {
        queryClient.setQueryData(["user"], context.previousValue);
      }
      toast.error(error.response?.data?.message || "Failed to update profile");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
