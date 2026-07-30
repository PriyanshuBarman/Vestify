import { TrendingUpIcon } from "lucide-react";

import { useGetPopularFunds } from "@/features/mutual-fund/hooks/useGetPopularFunds";
import { useGetPopularStocks } from "@/features/stock/hooks/useGetPopularStocks";

function TrendingSearchList({ searchType, activeIdx, handleClick }) {
  const { data: popularFunds, isPending: isFundsPending } =
    useGetPopularFunds();
  const { data: popularStocks, isPending: isStocksPending } =
    useGetPopularStocks();

  const isPending = isFundsPending || isStocksPending;

  const popularItems =
    searchType === "mutualFunds" ? popularFunds : popularStocks;

  if (isPending) {
    return null;
  }
  return (
    <div className="mt-2 px-2">
      <h6 className="text-sm sm:font-medium">
        Popular {searchType === "mutualFunds" ? "Funds" : "Stocks"}
      </h6>

      <ul className="mt-4 flex flex-wrap justify-between gap-4 sm:gap-6">
        {popularItems?.slice(0, 4).map((item, idx) => (
          <li
            key={idx}
            onClick={() => handleClick(item)}
            className={`${activeIdx === idx && "bg-accent"} hover:bg-accent flex w-full items-center justify-start gap-2 rounded-md border px-4 py-2 text-xs sm:text-sm`}
          >
            <TrendingUpIcon
              size={16}
              className="text-muted-foreground shrink-0"
            />
            <p className="truncate capitalize">
              {item.short_name ||
                item.name ||
                item.longName ||
                item.shortname?.toLowerCase()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingSearchList;
