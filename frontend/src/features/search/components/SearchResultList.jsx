import { memo } from "react";
import { BookmarkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAddFundToWatchlist as useAddMfToWatchlist } from "@/features/mutual-fund/hooks/useAddFundToWatchlist";
import { useGetWatchlist as useGetMfWatchlist } from "@/features/mutual-fund/hooks/useGetWatchlist";
import { useRemoveFundFromWatchlist as useRemoveMfFromWatchlist } from "@/features/mutual-fund/hooks/useRemoveFundFromWatchlist";
import { useAddStockToWatchlist } from "@/features/stock/hooks/useAddStockToWatchlist";
import { useGetWatchlist as useGetStockWatchlist } from "@/features/stock/hooks/useGetWatchlist";
import { useRemoveFromWatchlist as useRemoveStockFromWatchlist } from "@/features/stock/hooks/useRemoveFromWatchlist";

import CompanyLogo from "./CompanyLogo";

function SearchResultList({
  searchResult,
  handleClick,
  activeIdx,
  searchType,
}) {
  const { data: mfWatchlist } = useGetMfWatchlist();
  const { mutate: addMfToWatchlist } = useAddMfToWatchlist({
    showToast: false,
  });
  const { mutate: removeMfFromWatchlist } = useRemoveMfFromWatchlist({
    showToast: false,
  });

  const { data: stockWatchlist } = useGetStockWatchlist();
  const { mutate: addStockToWatchlist } = useAddStockToWatchlist({
    showToast: false,
  });
  const { mutate: removeStockFromWatchlist } = useRemoveStockFromWatchlist({
    showToast: false,
  });

  if (!searchResult?.length) return null;

  const isItemInWatchlist = (item) => {
    if (searchType === "indianStocks") {
      return stockWatchlist?.some((w) => w.symbol === item.symbol);
    }
    return mfWatchlist?.some((w) => w.schemeCode === item.scheme_code);
  };

  const handleWatchlistClick = (e, item) => {
    e.stopPropagation();

    if (searchType === "indianStocks") {
      if (isItemInWatchlist(item)) {
        removeStockFromWatchlist({ symbol: item.symbol });
      } else {
        addStockToWatchlist({
          symbol: item.symbol,
          name: item.longname || item.shortname || item.name || item.symbol,
          shortName: item.shortname || item.symbol,
        });
      }
    } else {
      if (isItemInWatchlist(item)) {
        removeMfFromWatchlist({ schemeCode: item.scheme_code });
      } else {
        addMfToWatchlist({
          schemeCode: item.scheme_code,
          fundName: item.name,
          fundShortName: item.short_name,
          fundHouseDomain: item.detail_info,
        });
      }
    }
  };

  return (
    <ul>
      {searchResult.map((item, idx) => (
        <li
          key={idx}
          onClick={() => handleClick(item)}
          className={`${activeIdx === idx && "bg-accent"} hover:bg-accent flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 sm:my-1`}
        >
          <CompanyLogo searchType={searchType} item={item} />
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-foreground capitalize max-w-[23ch] truncate text-sm sm:max-w-[30ch] sm:text-sm">
                {item.short_name ||
                  item.name ||
                  item.longname ||
                  item.shortname?.toLowerCase()}{" "}
                {item.prevName && (
                  <span className="text-xs">({item.prevName})</span>
                )}
              </p>
              <span className="Category text-muted-foreground text-xs">
                {item.fund_category || item.subcategory || item.industry}
              </span>
            </div>
          </div>

          <Button
            onClick={(e) => handleWatchlistClick(e, item)}
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-input"
          >
            <BookmarkIcon
              className={`${isItemInWatchlist(item) ? "fill-primary text-primary stroke-primary" : ""} size-5`}
            />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default memo(SearchResultList);
