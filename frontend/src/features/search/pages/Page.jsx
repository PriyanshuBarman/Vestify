import { lazy, Suspense, useRef, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useDebounce } from "@/hooks/useDebounce";
import { Spinner } from "@/components/ui/spinner";
import GoBackButton from "@/components/GoBackButton";
import { useGetSearchResults } from "@/features/search/hooks/useGetSearchResults";
import { useKeyboardDismiss } from "@/features/search/hooks/useKeyboardDismis";
import { addToSearchHistory } from "@/store/slices/searchSlice";

import TrendingSearchList from "../components/TrendingSearchList";

const FilterTabs = lazy(() => import("../components/FilterTabs"));
const SearchHistoryList = lazy(() => import("../components/SearchHistoryList"));
const SearchResultList = lazy(() => import("../components/SearchResultList"));

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("indianStocks");
  const debouncedQuery = useDebounce(query.trim());

  const searchHistory = useSelector((state) => state.search.searchHistory);
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  useKeyboardDismiss(inputRef);

  const { data: searchResult, isLoading } = useGetSearchResults(
    debouncedQuery,
    searchType,
  );

  const handleClick = (item) => {
    if (searchType === "mutualFunds") {
      navigate(`/mutual-funds/${item.scheme_code}`, {
        replace: true,
      });
    } else {
      navigate(`/stocks/${item.symbol}`, {
        replace: true,
      });
    }
    setQuery("");
    dispatch(addToSearchHistory({ item, type: searchType }));
    if (inputRef.current) inputRef.current.blur();
  };

  return (
    <div className="bg-background h-dvh space-y-4 overflow-y-auto">
      {/* ============================ SearchBar ============================ */}
      <div className="SearchBar bg-background flex gap-2 border-b px-2 pt-6 pb-2">
        <GoBackButton className="[&_svg]:size-5" />
        <input
          ref={inputRef}
          type="search"
          className="w-full outline-none"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button
          className={`Clear-Btn size-auto ${!query.length && "hidden"}`}
          disabled={isLoading}
          onClick={() => {
            inputRef.current.focus();
            setQuery("");
          }}
        >
          {isLoading ? <Spinner className="text-primary" /> : <X size={20} />}
        </button>
      </div>
      {/* ============================ SearchBar ============================ */}
      <FilterTabs searchType={searchType} setSearchType={setSearchType} />

      <div className="Lists space-y-4 px-2">
        <Suspense fallback={null}>
          <SearchResultList
            searchResult={searchResult}
            searchType={searchType}
            handleClick={handleClick}
          />

          {!searchResult && !isLoading && !query && (
            <SearchHistoryList
              searchHistory={searchHistory}
              searchType={searchType}
              handleClick={handleClick}
            />
          )}
        </Suspense>
        {!searchResult && !searchHistory[searchType]?.length && !isLoading && (
          <TrendingSearchList
            searchType={searchType}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
