import { fetchScreenshots } from "@/api/landing";
import { useQuery } from "@tanstack/react-query";

export function useGetScreenshots() {
  return useQuery({
    queryKey: ["screenshots"],
    queryFn: fetchScreenshots,
  });
}
