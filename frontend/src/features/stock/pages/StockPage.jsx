import { lazy, Suspense, useEffect } from "react";
import { BookmarkIcon, SearchIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import GoBackBar from "@/components/GoBackBar";
import { setIsSearchOpen } from "@/store/slices/searchSlice";
import { addToRecentlyViewedStocks } from "@/store/slices/stockSlice";

import StockLogo from "../../../components/StockLogo";
import BuySellButtons from "../components/BuySellButtons";
import Chart from "../components/charts/Chart";
import Fundamentals from "../components/Fundamentals";
import Performance from "../components/Performance";
import RecentlyViewedSection from "../components/sections/RecentlyViewedSection";
import SimilarStocks from "../components/SimilarStocks";
import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useGetIsInWatchlist } from "../hooks/useGetIsInWatchlist";
import { useGetStockData } from "../hooks/useGetStockData";
import { useRemoveFromWatchlist } from "../hooks/useRemoveFromWatchlist";
import { useSubscribeStock } from "../hooks/useSubscribeStock";

const DesktopPaymentCard = lazy(
  () => import("../components/DesktopPaymentCard"),
);

function StockPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile({ maxWidth: 1024 });
  const { symbol } = useParams();
  const { data: stock = {}, isPending } = useGetStockData(symbol);
  useSubscribeStock(symbol);

  const { data: isInWatchlist } = useGetIsInWatchlist(symbol);
  const { mutate: addToWatchlist, isPending: isAdding } = useAddToWatchlist();
  const { mutate: removeFromWatchlist, isPending: isRemoving } =
    useRemoveFromWatchlist();

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist({ symbol });
    } else {
      addToWatchlist({
        symbol: stock.symbol,
        name: stock.longName ?? stock.symbol,
        shortName: stock.shortName ?? stock.symbol,
      });
    }
  };

  const handleSearchClick = () => {
    isMobile ? navigate("/search") : dispatch(setIsSearchOpen(true));
  };

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
                onClick={handleSearchClick}
                size="icon"
                variant="ghost"
                className="bg-accent rounded-full p-5 sm:bg-transparent sm:p-6"
              >
                <SearchIcon className="size-5 sm:size-6" />
              </Button>

              <Button
                disabled={isPending || isAdding || isRemoving}
                onClick={handleWatchlistClick}
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
          <span className="flex text-sm text-muted-foreground">
            {stock.symbol} | {stock.fullExchangeName}
          </span>

          <h2 className="fund-name min-h-[1.8rem] text-lg leading-tight font-medium tracking-tight sm:min-h-[1.9rem] sm:text-2xl sm:font-semibold">
            {stock.longName}
          </h2>
        </div>

        <Chart symbol={symbol} />
        <Fundamentals stock={stock} />

        <Accordion type="multiple" className="sm:mt-10 border-t border-b">
          <AccordionItem value="item-1" className="px-4 py-3 sm:px-0 sm:py-4">
            <AccordionTrigger className="text-base sm:text-xl sm:font-semibold">
              Performance
            </AccordionTrigger>
            <AccordionContent className="py-4">
              <Performance stock={stock} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="py-3 sm:py-4">
            <AccordionTrigger className="px-4 text-base sm:px-0 sm:text-xl sm:font-semibold">
              Similar Stocks
            </AccordionTrigger>
            <AccordionContent className="sm:py-4">
              <SimilarStocks symbol={symbol} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <RecentlyViewedSection />

        {isMobile && <BuySellButtons symbol={symbol} isPending={isPending} />}
      </div>
      {!isMobile && (
        <Suspense fallback={null}>
          <DesktopPaymentCard stock={stock} />
        </Suspense>
      )}
    </div>
  );
}

export default StockPage;
