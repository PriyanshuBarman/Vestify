import { memo } from "react";
import { BookmarkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAddFundToWatchlist } from "@/features/mutual-fund/hooks/useAddFundToWatchlist";
import { useGetWatchlist } from "@/features/mutual-fund/hooks/useGetWatchlist";
import { useRemoveFundFromWatchlist } from "@/features/mutual-fund/hooks/useRemoveFundFromWatchlist";

import CompanyLogo from "./CompanyLogo";

function SearchResultList({
  searchResult,
  handleClick,
  activeIdx,
  searchType,
}) {
  const { data: watchlist } = useGetWatchlist();
  const { mutate: addToWatchlist } = useAddFundToWatchlist();
  const { mutate: removeFromWatchlist } = useRemoveFundFromWatchlist();

  if (!searchResult?.length) return null;

  const isInWatchlist = (fund) => {
    return watchlist?.some((item) => item.schemeCode === fund.scheme_code);
  };

  const handleWatchlistClick = (e, fund) => {
    e.stopPropagation();
    if (isInWatchlist(fund)) {
      removeFromWatchlist({ schemeCode: fund.scheme_code });
    } else {
      addToWatchlist({
        schemeCode: fund.scheme_code,
        fundName: fund.name,
        fundShortName: fund.short_name,
        fundHouseDomain: fund.detail_info,
      });
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
              <p className="Fund-Name text-foreground max-w-[23ch] truncate text-sm sm:max-w-[30ch] sm:text-sm">
                {item.short_name || item.name}
              </p>
              <span className="Category text-muted-foreground text-xs">
                {item.fund_category || item.subcategory}
              </span>
            </div>
          </div>

          <Button
            onClick={(e) => handleWatchlistClick(e, item)}
            size="icon-sm"
            variant="ghost"
            className={`rounded-full`}
          >
            <BookmarkIcon
              className={`${isInWatchlist(item) && "fill-primary text-primary stroke-primary"} size-5`}
            />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default memo(SearchResultList);
