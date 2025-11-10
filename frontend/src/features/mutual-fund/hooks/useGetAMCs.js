import { useQuery } from "@tanstack/react-query";
import { fetchAMCs } from "../api/external";

export function useGetAMCs() {
  return useQuery({
    queryKey: ["amcs"],
    queryFn: fetchAMCs,
  });
}
