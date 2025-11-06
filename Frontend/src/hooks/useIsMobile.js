import { useMediaQuery } from "react-responsive";

export const useIsMobile = (config) =>
  useMediaQuery(config || { maxWidth: 640 });
