import { useQuery } from "@tanstack/react-query";
import { searchProfile } from "../api/profile";

export const useSearchProfile = (query) => {
  return useQuery({
    queryKey: ["profiles", query],
    queryFn: () => searchProfile(query),
    enabled: !!query,
  });
};
