import { useEffect } from "react";

import { useIsMobile } from "./useIsMobile";

export function useBackClose(open, onClose) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open || !isMobile) return;

    window.history.pushState({ ...window.history.state, dialog: true }, "");

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, open]);
}
