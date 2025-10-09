import { Spinner } from "@/components/ui/spinner";
import { setIsSearchOpen } from "@/store/slices/searchSlice";
import { SearchIcon, XIcon } from "lucide-react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Only used in DesktopSearch

function SearchBar({
  displayQuery,
  onChange,
  isLoading,
  setQuery,
  setDisplayQuery,
  searchBarRef,
}) {
  const { isSearchOpen } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  return (
    <div className="SearchBar text-muted-foreground relative flex w-full items-center">
      <SearchIcon size={20} className="absolute left-4" />
      <input
        ref={searchBarRef}
        type="text"
        value={displayQuery}
        onChange={onChange}
        onFocus={() => dispatch(setIsSearchOpen(true))}
        placeholder="Search "
        className={`!bg-background text-foreground min-w-full rounded-lg border px-12 py-2 outline-none ${isSearchOpen && "rounded-b-none border"}`}
      />
      <button
        disabled={isLoading}
        className={`Clear-Btn absolute right-4 ${!displayQuery?.length && "hidden"}`}
        onClick={() => {
          setQuery("");
          setDisplayQuery("");
          searchBarRef.current.focus();
        }}
      >
        {isLoading ? <Spinner className="text-primary" /> : <XIcon size={18} />}
      </button>

      <p
        className={`${displayQuery?.length && "hidden"} absolute right-6 text-xs`}
      >
        Ctrl+K
      </p>
    </div>
  );
}

export default memo(SearchBar);
