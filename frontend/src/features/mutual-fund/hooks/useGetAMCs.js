import { useQuery } from "@tanstack/react-query";
import { fetchAMCs } from "../api/external";
import { useIsMobile } from "@/hooks/useIsMobile";

export function useGetAMCs() {
  const isMobile = useIsMobile();
  const length = isMobile ? 8 : 6;
  const placeholderData = Array.from({ length }, (_, i) => ({}));

  return useQuery({
    queryKey: ["amcs"],
    queryFn: fetchAMCs,
    placeholderData,
  });
}
