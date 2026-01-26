import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { useGetFundsData } from "../hooks/useGetFundsData";
import { useGetWatchlist } from "../hooks/useGetWatchlist";
import { useRemoveFromWatchlist } from "../hooks/useRemoveFromWatchlist";
import FundLogo from "./FundLogo";
import FundRating from "./FundRating";
import SectionHeading from "./SectionHeading";

function YourWatchlist() {
  const { data: watchlist = [] } = useGetWatchlist();
  const { data: fundsData = [] } = useGetFundsData(
    watchlist?.map((fund) => fund.schemeCode),
  );

  if (!watchlist?.length) return null;

  return (
    <div className="w-sm">
      <SectionHeading heading={"Your watchlist"} />
      <Card className="mt-4 rounded-3xl">
        <CardContent className="space-y-6 px-4">
          {watchlist?.map((fund, index) => (
            <WatchlistItem
              key={fund.schemeCode}
              fund={fund}
              fundData={fundsData[index]}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default YourWatchlist;

function WatchlistItem({ fund, fundData }) {
  const { mutate, isPending } = useRemoveFromWatchlist();
  const handleRemoveClick = (e) => {
    e.preventDefault();
    mutate({ schemeCode: fund.schemeCode });
  };
  return (
    <Link
      to={`/mutual-funds/${fund.schemeCode}`}
      className="group flex min-w-full items-center rounded-lg p-2"
    >
      <FundLogo fundHouseDomain={fund.fundHouseDomain} className="sm:size-9" />

      <div className="ml-3 flex-1">
        <h3 className="line-clamp-1 text-[0.9rem]">{fund.fundShortName}</h3>
        <div className="text-muted-foreground text-2xs flex items-center gap-2">
          <span className="capitalize">{fundData?.fund_category}</span>
          <FundRating rating={fundData?.fund_rating} />
        </div>
      </div>

      <div className="ml-auto flex flex-col items-end">
        <div className="animate-in zoom-in flex flex-col items-end group-hover:hidden">
          <span className="text-sm font-medium">
            {fundData?.day_change_percent || "NA"}%
          </span>
          <span className="text-muted-foreground text-xs">1D</span>
        </div>
        <Button
          disabled={isPending}
          onClick={handleRemoveClick}
          variant="icon-sm"
          className="hover:bg-accent hover:text-destructive animate-in fade-ins zoom-in hidden size-7.5 rounded-full group-hover:flex"
        >
          {isPending ? <Spinner /> : <Trash2Icon />}
        </Button>
      </div>
    </Link>
  );
}
