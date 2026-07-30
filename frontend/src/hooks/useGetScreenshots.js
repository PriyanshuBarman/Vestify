import { useQuery } from "@tanstack/react-query";

import { fetchScreenshots } from "@/api/public-api";

export function useGetScreenshots() {
  return useQuery({
    queryKey: ["screenshots"],
    queryFn: fetchScreenshots,
  });
}
