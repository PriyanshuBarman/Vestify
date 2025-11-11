import { updateProfile } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Optimistic update
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });
      const previousValue = queryClient.getQueryData(["user"]);
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
