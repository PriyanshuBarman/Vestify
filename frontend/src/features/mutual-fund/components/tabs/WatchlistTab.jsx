import { Button } from "@/components/ui/button";
import { ChevronsLeftRightIcon } from "lucide-react";
import { lazy, useState } from "react";
import { Link } from "react-router";
import { useGetFundsData } from "../../hooks/useGetFundsData";
import { useGetWatchlist } from "../../hooks/useGetWatchlist";
import FundLogo from "../FundLogo";
import FundRating from "../FundRating";
import LoadingState from "@/components/LoadingState";
const NoWatchlist = lazy(() => import("../empty-states/NoWatchlist"));

const labelArr = [
  { key: "day_change_percent", label: "1D Returns", shortLabel: "1D" },
  { key: "return_1y", label: "1Y Returns", shortLabel: "1Y" },
  { key: "return_3y", label: "3Y Returns", shortLabel: "3Y" },
  { key: "return_5y", label: "5Y Returns", shortLabel: "5Y" },
];

function WatchlistTab({ username }) {
  const isOtherUserProfile = !!username;
  const [activeLabelIdx, setActiveLabelIdx] = useState(0);
  const { data: watchlist = [], isPending } = useGetWatchlist(username);
  const { data: fundsData = [] } = useGetFundsData(
    watchlist?.map((fund) => fund.schemeCode),
  );

  // Loop ♾️
  const handleClick = () => {
    const nextIndex = (activeLabelIdx + 1) % labelArr.length;
    setActiveLabelIdx(nextIndex);
  };

  if (isPending) return <LoadingState />;
  if (!watchlist?.length) return <NoWatchlist readOnly={isOtherUserProfile} />;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-4 sm:mt-1 sm:space-y-4">
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
        <WatchlistItem
          key={fund.schemeCode}
          fund={fund}
          fundData={fundsData[index]}
          activeLabelIdx={activeLabelIdx}
          handleClick={handleClick}
          isOtherUserProfile={isOtherUserProfile}
        />
      ))}
    </div>
  );
}

export default WatchlistTab;

function WatchlistItem({
  fund,
  fundData,
  activeLabelIdx,
  handleClick,
  isOtherUserProfile,
}) {
  const Wrapper = isOtherUserProfile ? "div" : Link;
  const wrapperProps = isOtherUserProfile
    ? {}
    : { to: `/mutual-funds/${fund.schemeCode}` };

  return (
    <Wrapper
      {...wrapperProps}
      className={`flex min-w-full items-center border-b py-4 sm:rounded-2xl sm:border sm:px-4 ${!isOtherUserProfile ? "hover:bg-accent" : ""}`}
    >
      <FundLogo fundHouseDomain={fund.fundHouseDomain} />

      <div className="ml-4 space-y-2 space-x-2">
        <h3 className="sm:text-md text-sm">{fund.fundShortName}</h3>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span className="capitalize">{fundData?.fund_category}</span>
          <FundRating rating={fundData?.fund_rating} />
        </div>
      </div>

      <div
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
        className="ml-auto flex cursor-pointer flex-col items-end space-y-1"
      >
        <span className="sm:text-md text-sm font-medium">
          {fundData?.[labelArr[activeLabelIdx].key] || "NA"}%
        </span>
        <span className="text-muted-foreground mr-0.5 text-xs">
          {labelArr[activeLabelIdx].shortLabel}
        </span>
      </div>
    </Wrapper>
  );
}
