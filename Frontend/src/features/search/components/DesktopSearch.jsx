import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetPopularFunds } from "@/features/mutualfund/hooks/useGetPopularFunds";
import { useCtrlKSearchToggle } from "@/features/search/hooks/useCtrlKSearchToggle";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetSearchResults } from "@/features/search/hooks/useGetSearchResults";
import {
  addToSearchHistory,
  setIsSearchOpen,
} from "@/store/slices/searchSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FilterTabs from "./FilterTabs";
import LoadingSkeleton from "./LoadingSkeleton";
import SearchBar from "./SearchBar";
import TrendingSearchList from "./TrendingSearchList";
import SearchHistoryList from "./SearchHistoryList";
import SearchResultList from "./SearchResultList";

function DesktopSearch() {
  const { data: popularFunds } = useGetPopularFunds();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [displayQuery, setDisplayQuery] = useState("");
  const [searchType, setSearchType] = useState("mutualFunds");
  const [activeIdx, setActiveIdx] = useState(-1);
  const { searchHistory, isSearchOpen } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const searchBarRef = useRef();
  useCtrlKSearchToggle();

  const debouncedValue = useDebounce(query.trim());
  const { data: searchResult, isLoading } = useGetSearchResults(
    debouncedValue,
    searchType,
  );

  // Open / Close Search Based on isSearchOpen state
  useEffect(() => {
    if (isSearchOpen) {
      searchBarRef.current.focus();
    } else {
      setQuery("");
      setDisplayQuery("");
      setActiveIdx(-1);
      searchBarRef.current.blur();
    }
  }, [isSearchOpen]);

  // it's representing items displayed in searchp-opover
  // Purpose*: for keyboard navigation selection (Arrow Up/Down, Enter)
  let list;
  if (searchResult) {
    list = searchResult;
  } else if (searchHistory[searchType]?.length) {
    list = searchHistory[searchType];
  } else {
    list = popularFunds;
  }

  const handleKeyDown = (e) => {
    if (e.key == "ArrowDown") {
      setActiveIdx(activeIdx === list?.length - 1 ? 0 : activeIdx + 1);
    } else if (e.key === "ArrowUp") {
      if (activeIdx === -1) {
        setActiveIdx(list.length - 1);
      } else {
        setActiveIdx(activeIdx - 1);
      }
    } else if (e.key === "Escape") {
      dispatch(setIsSearchOpen(false));
    } else if (e.key === "Enter") {
      if (activeIdx < 0 || !list) return;
      handleClick(list[activeIdx]);
    }
  };

  const handleClick = useCallback(
    (item) => {
      navigate(`/mutual-funds/${item.scheme_code}`);
      dispatch(addToSearchHistory({ item, type: searchType }));
      dispatch(setIsSearchOpen(false));
    },
    [navigate, dispatch, searchType],
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    setDisplayQuery(e.target.value);
    setActiveIdx(-1);
  };

  // Purpose : to setDisplayQuery & show the selected item in the searchbar
  useEffect(() => {
    if (activeIdx >= 0 && list) setDisplayQuery(list[activeIdx]?.name);
  }, [activeIdx]);

  return (
    <>
      <div onKeyDown={handleKeyDown} className="relative z-30 w-xl">
        <SearchBar
          displayQuery={displayQuery}
          onChange={handleChange}
          isLoading={isLoading}
          setQuery={setQuery}
          setDisplayQuery={setDisplayQuery}
          searchBarRef={searchBarRef}
        />

        {isSearchOpen && (
          <div className="Search-Popover bg-background absolute z-10 w-full space-y-4 rounded-b-2xl border border-t-0 px-6 py-4">
            <FilterTabs searchType={searchType} setSearchType={setSearchType} />

            <ScrollArea className="max-h-[60vh] sm:pb-6">
              <LoadingSkeleton isLoading={isLoading} />

              <SearchResultList
                searchResult={searchResult}
                handleClick={handleClick}
                activeIdx={activeIdx}
                searchType={searchType}
              />

              {!searchResult && !isLoading && (
                <SearchHistoryList
                  handleClick={handleClick}
                  activeIdx={activeIdx}
                  searchType={searchType}
                />
              )}

              {/* {!searchResult &&
                !searchHistory[searchType]?.length &&
                !isLoading && (
                  <TrendingSearchList
                    activeIdx={activeIdx}
                    handleClick={handleClick}
                  />
                )} */}

              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Backdrop Overlay */}
      {isSearchOpen && (
        <div
          onClick={() => dispatch(setIsSearchOpen(false))}
          className="Backdrop-Overlay fixed inset-0 z-20 bg-black/20 backdrop-blur-xs"
        ></div>
      )}
    </>
  );
}

export default DesktopSearch;
