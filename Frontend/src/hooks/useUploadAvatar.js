import { updateAvatar } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: (avatar) => {
      queryClient.setQueryData(["user"], (user) => {
        return {
          ...user,
          profile: {
            ...user.profile,
            avatar: avatar,
          },
        };
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
}
