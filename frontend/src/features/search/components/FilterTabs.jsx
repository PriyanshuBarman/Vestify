import { memo } from "react";
import { Trash2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { clearSearchHistory } from "@/store/slices/searchSlice";

const FILTER_TABS = {
  Stocks: "indianStocks",
  "Mutual Funds": "mutualFunds",
};

function FilterTabs({ setSearchType, searchType }) {
  const searchHistory = useSelector((state) => state.search.searchHistory);
  const dispatch = useDispatch();

  return (
    <div className="flex w-full gap-3 px-4 sm:px-2">
      {Object.keys(FILTER_TABS).map((label) => (
        <Button
          size="sm"
          key={label}
          variant="outline"
          onClick={() => setSearchType(FILTER_TABS[label])}
          className={`text-foreground-secondary h-auto rounded-full py-1 text-[0.7rem] ${
            FILTER_TABS[label] === searchType &&
            "!border-foreground text-foreground !bg-foreground/5"
          }`}
        >
          {label}
        </Button>
      ))}

      <Button
        onClick={() => dispatch(clearSearchHistory({ type: searchType }))}
        variant="outline"
        size="icon-sm"
        className={`ml-auto ${searchHistory[searchType]?.length === 0 && "hidden"}`}
      >
        <Trash2Icon />
      </Button>
    </div>
  );
}

export default memo(FilterTabs);
