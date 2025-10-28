import { Button } from "@/components/ui/button";
import { ChevronsLeftRightIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useGetFundsData } from "../hooks/useGetFundsData";
import { useGetWatchlist } from "../hooks/useGetWatchlist";
import FundLogo from "./FundLogo";
import FundRating from "./FundRating";

const labelArr = [
  { key: "day_change_percent", label: "1D Returns", shortLabel: "1D" },
  { key: "return_1y", label: "1Y Returns", shortLabel: "1Y" },
  { key: "return_3y", label: "3Y Returns", shortLabel: "3Y" },
  { key: "return_5y", label: "5Y Returns", shortLabel: "5Y" },
];

function WatchlistTab() {
  const [activeLabelIdx, setActiveLabelIdx] = useState(0);
  const { data: watchlist = [] } = useGetWatchlist();
  const { data: fundsData = [] } = useGetFundsData(
    watchlist?.map((fund) => fund.schemeCode),
  );

  // Loop ♾️
  const handleClick = () => {
    const nextIndex = (activeLabelIdx + 1) % labelArr.length;
    setActiveLabelIdx(nextIndex);
  };

  if (!watchlist?.length) return <NoWatchlist />;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:mt-1 sm:space-y-4">
      <div className="flex items-center justify-between sm:px-0">
        <h4 className="text-muted-foreground sm:text-md text-[0.8rem] font-medium">
          Mutual Fund
        </h4>
        <Button
          onClick={handleClick}
          variant="ghost"
          className="text-foreground-secondary sm:text-md flex gap-1 text-[0.8rem] max-sm:!px-0"
        >
          <ChevronsLeftRightIcon strokeWidth={2.5} />
          <span className="border-muted-foreground border-b border-dashed">
            {labelArr[activeLabelIdx].label}
          </span>
        </Button>
      </div>

      {watchlist?.map((fund, index) => (
        <Link
          key={fund.schemeCode}
          to={`/mutual-funds/${fund.schemeCode}`}
          className="hover:bg-accent flex min-w-full items-center border-b py-4 sm:rounded-2xl sm:border sm:px-4"
        >
          <FundLogo fundHouseDomain={fund.fundHouseDomain} />

          <div className="ml-4 space-y-2 space-x-2">
            <h3 className="sm:text-md text-sm">{fund.shortName}</h3>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span className="capitalize">
                {fundsData[index]?.fund_category}
              </span>
              <FundRating rating={fundsData[index]?.fund_rating} />
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end space-y-1">
            <span className="sm:text-md text-sm font-medium">
              {fundsData[index]?.[labelArr[activeLabelIdx].key] || "NA"}%
            </span>
            <span className="text-muted-foreground mr-0.5 text-xs">
              {labelArr[activeLabelIdx].shortLabel}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default WatchlistTab;

function NoWatchlist() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img src="/NoData.svg" alt="sip" className="size-60 md:size-96" />
      <h3 className="font-medium sm:text-lg">Not watching any funds</h3>
      <p className="text-xs sm:text-sm">
        When you watch a fund, it will appear here
      </p>

      <Button asChild className="mt-4">
        <Link to="/mutual-funds/all-funds">Explore all funds</Link>
      </Button>
    </div>
  );
}
