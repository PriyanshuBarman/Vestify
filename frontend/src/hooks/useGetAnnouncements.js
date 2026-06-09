import { useQuery } from "@tanstack/react-query";

import { fetchAnnouncements } from "@/api/announcement";

export function useGetAnnouncements() {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
