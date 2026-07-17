import { useEffect } from "react";
import { BookmarkIcon, SearchIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import GoBackBar from "@/components/GoBackBar";
import { addToRecentlyViewedStocks } from "@/store/slices/stockSlice";

import Chart from "../components/charts/Chart";
import Fundamentals from "../components/Fundamentals";
import Performance from "../components/Performance";
import StockLogo from "../components/StockLogo";
import { useGetStockData } from "../hooks/useGetStockData";
import { useSubscribeStock } from "../hooks/useSubscribeStock";

function StockPage() {
  const { symbol } = useParams();
  const isInWatchlist = false;
  const { data: stock = {} } = useGetStockData(symbol);
  useSubscribeStock(symbol);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!stock.symbol) return;

    dispatch(
      addToRecentlyViewedStocks({
        symbol: stock.symbol,
        name: stock.longName ?? stock.symbol,
      }),
    );
  }, [dispatch, stock.longName, stock.symbol]);

  return (
    <div className="mt-4 sm:flex sm:gap-6">
      <GoBackBar showSearchIcon={false} />
      <div className="h-full w-full space-y-4 text-inherit sm:space-y-6 lg:w-[67%]">
        <div className="px-4 space-y-4 max-sm:pr-6">
          <div className="flex items-center justify-between">
            <StockLogo
              symbol={stock.symbol}
              className="size-9 border sm:size-13"
            />
            <div className="icons flex items-center gap-4">
              <Button
                // disabled={isPending}
                // onClick={handleSearchClick}
                size="icon"
                variant="ghost"
                className="bg-accent rounded-full p-5 sm:bg-transparent sm:p-6"
              >
                <SearchIcon className="size-5 sm:size-6" />
              </Button>

              <Button
                // disabled={isPending}
                // onClick={handleWatchlistClick}
                size="icon"
                variant="ghost"
                className={`bg-accent rounded-full p-5 sm:bg-transparent sm:p-6 ${isInWatchlist && "bg-primary/10!"}`}
              >
                <BookmarkIcon
                  className={`${isInWatchlist && "fill-primary text-primary stroke-primary"} size-5 sm:size-6`}
                />
              </Button>
            </div>
          </div>
          <span className="flex  text-sm text-muted-foreground">
            {stock.symbol} | {stock.fullExchangeName}
          </span>

          <h2 className="fund-name  min-h-[1.8rem] text-lg leading-tight font-medium tracking-tight sm:min-h-[1.9rem] sm:text-2xl sm:font-semibold">
            {stock.longName}
          </h2>
        </div>

        <Chart symbol={symbol} />

        <div className="px-4 mt-12">
          <Performance stock={stock} />
          <Fundamentals stock={stock} />
        </div>
      </div>
    </div>
  );
}

export default StockPage;
