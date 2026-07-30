import { Trash2Icon } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import SectionHeading from "@/components/SectionHeading";
import StockLogo from "@/components/StockLogo";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveData } from "../hooks/useGetLiveData";
import { useGetWatchlist } from "../hooks/useGetWatchlist";
import { useRemoveFromWatchlist } from "../hooks/useRemoveFromWatchlist";
import { useSubscribeStock } from "../hooks/useSubscribeStock";

function YourWatchlist() {
  const { data: watchlist = [] } = useGetWatchlist();
  const symbols = watchlist?.map((item) => item.symbol);
  useSubscribeStock(symbols);

  if (!watchlist?.length) return null;

  return (
    <div className="w-sm">
      <SectionHeading heading={"Your watchlist"} />
      <Card className="mt-4 rounded-3xl">
        <CardContent className="space-y-6 px-4">
          {watchlist?.map((item) => (
            <WatchlistItem key={item.id || item.symbol} item={item} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default YourWatchlist;

function WatchlistItem({ item }) {
  const live = useGetLiveData(item.symbol);
  const { mutate, isPending } = useRemoveFromWatchlist();

  const handleRemoveClick = (e) => {
    e.preventDefault();
    mutate({ symbol: item.symbol });
  };

  return (
    <Link
      to={`/stocks/${item.symbol}`}
      className="group flex min-w-full items-center rounded-lg p-2"
    >
      <StockLogo symbol={item.symbol} className="sm:size-9" />

      <div className="ml-3 flex-1">
        <h3 className="line-clamp-1 text-[0.9rem]">{item.name}</h3>
        <div className="text-muted-foreground text-2xs flex items-center gap-2">
          <span>{item.symbol}</span>
        </div>
      </div>

      <div className="ml-auto flex flex-col items-end">
        <div className="animate-in zoom-in flex flex-col items-end group-hover:hidden">
          {live.price != null ? (
            <>
              <span className="text-sm font-medium tabular-nums">
                {formatToINR(live.price, 2, 2)}
              </span>
              <span
                className={`text-2xs tabular-nums ${live.change >= 0 ? "text-positive" : "text-negative"}`}
              >
                {live.change?.toFixed(2)} ({live.changePercent?.toFixed(2)}%)
              </span>
            </>
          ) : (
            <span className="text-sm font-medium tabular-nums">--</span>
          )}
        </div>
        <Button
          disabled={isPending}
          onClick={handleRemoveClick}
          variant="icon"
          className="hover:text-destructive animate-in fade-ins zoom-in hidden size-9 cursor-pointer hover:bg-destructive/10 rounded-full group-hover:flex"
        >
          {isPending ? <Spinner /> : <Trash2Icon />}
        </Button>
      </div>
    </Link>
  );
}
