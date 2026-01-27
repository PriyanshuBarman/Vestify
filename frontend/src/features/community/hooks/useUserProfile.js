import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api/community";

export function useUserProfile(username) {
  return useQuery({
    queryKey: ["community", "profile", username],
    queryFn: () => fetchUserProfile(username),
    staleTime: 0,
  });
}
