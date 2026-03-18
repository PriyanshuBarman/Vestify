import { useQuery } from "@tanstack/react-query";

import { fetchScreenshots } from "@/api/landing";

export function useGetScreenshots() {
  return useQuery({
    queryKey: ["screenshots"],
    queryFn: fetchScreenshots,
  });
}
