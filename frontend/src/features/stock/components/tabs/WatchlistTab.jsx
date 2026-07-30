import { lazy } from "react";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import LoadingState from "@/components/LoadingState";
import StockLogo from "@/components/StockLogo";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveData } from "../../hooks/useGetLiveData";
import { useGetWatchlist } from "../../hooks/useGetWatchlist";
import { useRemoveFromWatchlist } from "../../hooks/useRemoveFromWatchlist";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";

const NoWatchlist = lazy(() => import("@/components/empty-states/NoWatchlist"));

function WatchlistTab({ username, isActive }) {
  const isOtherUserProfile = Boolean(username);

  const { data: watchlist = [], isLoading } = useGetWatchlist(username);
  const symbols = watchlist.map((item) => item.symbol);
  useSubscribeStock(symbols, { enabled: isActive });

  if (isLoading) {
    return <LoadingState />;
  }
  if (!watchlist?.length) {
    return <NoWatchlist type="stock" isOtherUserProfile={isOtherUserProfile} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-4 sm:mt-1 sm:space-y-4">
      {watchlist.map((item) => (
        <WatchlistItem
          key={item.id}
          item={item}
          isOtherUserProfile={isOtherUserProfile}
        />
      ))}
    </div>
  );
}

export default WatchlistTab;

function WatchlistItem({ item, isOtherUserProfile }) {
  const live = useGetLiveData(item.symbol);
  const { mutate, isPending } = useRemoveFromWatchlist();

  const handleRemoveClick = (e) => {
    e.preventDefault();
    mutate({ symbol: item.symbol });
  };

  return (
    <Link
      to={`/stocks/${item.symbol}`}
      className="group hover:bg-accent flex min-w-full items-center border-b py-4 sm:rounded-2xl sm:border sm:px-4"
    >
      <StockLogo symbol={item.symbol} />

      <div className="ml-4 space-y-2 space-x-2 flex-1">
        <h3 className="sm:text-md text-sm line-clamp-1">{item.name}</h3>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span>{item.symbol}</span>
        </div>
      </div>

      <div className="ml-auto flex flex-col items-end">
        <div
          className={`flex flex-col items-end ${!isOtherUserProfile ? "group-hover:hidden" : ""}`}
        >
          {live.price != null ? (
            <>
              <span className="sm:text-md text-sm font-medium tabular-nums">
                {formatToINR(live.price, 2, 2)}
              </span>
              <span
                className={`text-xs tabular-nums ${live.change >= 0 ? "text-positive" : "text-negative"}`}
              >
                {live.change?.toFixed(2)} ({live.changePercent?.toFixed(2)}%)
              </span>
            </>
          ) : (
            <span className="text-sm font-medium tabular-nums">--</span>
          )}
        </div>
        {!isOtherUserProfile && (
          <Button
            disabled={isPending}
            onClick={handleRemoveClick}
            variant="icon-sm"
            className="hover:bg-accent hover:text-destructive animate-in fade-ins zoom-in hidden size-9 rounded-full group-hover:flex"
          >
            {isPending ? <Spinner /> : <Trash2Icon />}
          </Button>
        )}
      </div>
    </Link>
  );
}
