import { useEffect } from "react";
/**
 *
 * Prevents background page scrolling when modals, sheets, or overlays are open.
 * Pass `true` to lock scroll, `false` to unlock. Automatically restores scroll
 * when component unmounts or hook is cleaned up.
 *
 * @param {boolean} lock - Whether to lock/unlock body scroll
 *
 * Usage:
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * useScrollLock(isModalOpen);
 */

export function useScrollLock(lock) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lock]);
}
