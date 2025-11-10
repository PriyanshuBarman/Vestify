import { Button } from "@/components/ui/button";
import { clearSearchHistory } from "@/store/slices/searchSlice";
import { Trash2Icon } from "lucide-react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

const filterTabs = {
  Stocks: "indianStocks",
  "Mutual Funds": "mutualFunds",
};

function FilterTabs({ setSearchType, searchType }) {
  const searchHistory = useSelector((state) => state.search.searchHistory);
  const dispatch = useDispatch();

  return (
    <div className="flex w-full gap-3 px-4 sm:px-2">
      {/* {Object.keys(filterTabs).map((label) => (
        <Button
          size="sm"
          key={label}
          variant="outline"
          onClick={() => setSearchType(filterTabs[label])}
          className={`text-foreground-secondary h-auto rounded-full py-1 text-[0.7rem] ${
            filterTabs[label] === searchType &&
            "!border-foreground text-foreground !bg-foreground/5"
          }`}
        >
          {label}
        </Button>
      ))} */}

      <Button
        onClick={() => dispatch(clearSearchHistory({ type: searchType }))}
        variant="ghost"
        size="icon"
        className={`ml-auto h-auto ${searchHistory[searchType]?.length === 0 && "hidden"}`}
      >
        <Trash2Icon />
      </Button>
    </div>
  );
}

export default memo(FilterTabs);
