import { useQuery } from "@tanstack/react-query";

import { useIsMobile } from "@/hooks/useIsMobile";

import { fetchAMCs } from "../api/external";

export function useGetAMCs() {
  const isMobile = useIsMobile();
  const length = isMobile ? 8 : 6;
  const placeholderData = Array.from({ length }, (_) => ({}));

  return useQuery({
    queryKey: ["amcs"],
    queryFn: fetchAMCs,
    placeholderData,
  });
}
