import { fetchProfileById } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";

export const useGetProfileById = (userId, state) => {
    return useQuery({
      queryKey: ["profile", userId],
      queryFn: () => fetchProfileById(userId),
      enabled: !state?.name && !state?.username && !state?.avatar,
    });
  };
  