import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

import { useIsMobile } from "@/hooks/useIsMobile";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SectionHeading from "@/components/SectionHeading";
import StockLogo from "@/components/StockLogo";
import { selectRecentlyViewedStocks } from "@/store/slices/stockSlice";

import { useGetLiveData } from "../../hooks/useGetLiveData";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";

function RecentlyViewedSection({ showLivePrice = false }) {
  const isMobile = useIsMobile();
  const stocks = useSelector(selectRecentlyViewedStocks);

  const displayStocks = useMemo(() => {
    if (!stocks?.length) return [];
    return isMobile ? stocks.slice(0, 5) : stocks;
  }, [stocks, isMobile]);

  const symbols = useMemo(() => {
    return displayStocks.map((stock) => stock.symbol);
  }, [displayStocks]);

  useSubscribeStock(symbols, { enabled: showLivePrice });

  if (!stocks?.length) return null;

  return (
    <section className="swiper-no-swiping ">
      <SectionHeading heading="Recently viewed" />

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 px-4 sm:p-1 ">
          {displayStocks.map(({ symbol }) => (
            <Item key={symbol} symbol={symbol} showLivePrice={showLivePrice} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="max-sm:hidden" />
      </ScrollArea>
    </section>
  );
}

export default RecentlyViewedSection;

function Item({ symbol, showLivePrice }) {
  const live = useGetLiveData(symbol);
  const isPositive = live?.change >= 0;

  return (
    <Link
      draggable={false}
      to={`/stocks/${symbol}`}
      className="flex flex-col p-1 shrink-0 sm:px-3 items-center cursor-pointer gap-2 rounded-2xl hover:scale-101 sm:m-0.5 sm:gap-4"
    >
      <StockLogo symbol={symbol} />
      <div className="flex flex-col gap-2 items-center justify-center">
        <span className=" text-[0.6rem] sm:text-2xs sm:font-[450]">
          {symbol}
        </span>
        {showLivePrice && !live?.isPending && (
          <span
            className={`text-xs sm:text-sm font-[450] ${
              isPositive ? "text-positive" : "text-negative"
            }`}
          >
            {isPositive ? "+" : ""}
            {live.changePercent.toFixed(2)}%
          </span>
        )}
      </div>
    </Link>
  );
}
