import { useEffect } from "react";
import { useIsMobile } from "./useIsMobile";

export function useBackClose(open, onClose) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open || !isMobile) return;

    window.history.pushState({ ...window.history.state, dialog: true }, "");

    const handlePopState = (e) => {
      onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open]);
}
