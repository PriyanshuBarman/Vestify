import { useEffect } from "react";
/**
 * Custom hook that automatically dismisses/close the mobile keyboard when the user starts scrolling
 * or performs touch movements that suggest they want to interact with the page
 */
export function useKeyboardDismiss(inputRef) {
  useEffect(() => {
    const handleScroll = () => {
      if (document.activeElement === inputRef.current) {
        inputRef.current.blur();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [inputRef]);
}
