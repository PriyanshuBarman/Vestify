import { useSelector } from "react-redux";
import { Link } from "react-router";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SectionHeading from "@/components/SectionHeading";
import StockLogo from "@/components/StockLogo";
import { selectRecentlyViewedStocks } from "@/store/slices/stockSlice";

function RecentlyViewedSection() {
  const stocks = useSelector(selectRecentlyViewedStocks);
  if (!stocks?.length) return null;

  return (
    <section className="swiper-no-swiping ">
      <SectionHeading heading="Recently Viewed" />

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 px-4 sm:p-1 ">
          {stocks.map(({ symbol }) => (
            <Link
              draggable={false}
              key={symbol}
              to={`/stocks/${symbol}`}
              className="flex flex-col p-1 shrink-0 sm:px-3 items-center cursor-pointer gap-2 rounded-2xl hover:scale-101 sm:m-0.5 sm:gap-4"
            >
              <StockLogo symbol={symbol} />
              <span className="line-clamp-2 text-2xs sm:font-[450]">
                {symbol}
              </span>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="max-sm:hidden" />
      </ScrollArea>
    </section>
  );
}

export default RecentlyViewedSection;
