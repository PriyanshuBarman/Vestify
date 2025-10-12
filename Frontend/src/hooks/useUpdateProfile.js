import { updateProfile } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Optimistic update
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["user"] });

      // Snapshot the previous value
      const previousValue = queryClient.getQueryData(["user"]);

      // Optimistically update the user data
      queryClient.setQueryData(["user"], (user) => {
        return {
          ...user,
          profile: {
            ...user.profile,
            ...variables,
          },
        };
      });

      return { previousValue, variables };
    },

    onError: (error, variables, context) => {
      console.log(error);
      // Revert the optimistic update on error
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
