import { useMediaQuery } from "react-responsive";

export function useIsMobile(config) {
  return useMediaQuery(config || { maxWidth: 640 });
}
