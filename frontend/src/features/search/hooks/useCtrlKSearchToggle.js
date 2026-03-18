import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setIsSearchOpen } from "@/store/slices/searchSlice";

export function useCtrlKSearchToggle() {
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (!isSearchOpen) {
          dispatch(setIsSearchOpen(true));
        } else {
          dispatch(setIsSearchOpen(false));
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => document.removeEventListener("keydown", handleGlobalKeyDown);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchOpen]);
}
