import { useSelector } from "react-redux";
import { Link } from "react-router";

import SectionHeading from "@/components/SectionHeading";
import { selectRecentlyViewedStocks } from "@/store/slices/stockSlice";

import StockLogo from "../StockLogo";

function RecentlyViewedSection() {
  const stocks = useSelector(selectRecentlyViewedStocks);

  if (!stocks?.length) return null;

  return (
    <section className="swiper-no-swiping">
      <SectionHeading heading="Recently viewed" />
      <div className="flex gap-8 sm:gap-12 overflow-x-auto scrollbar-none px-4 sm:px-0">
        {stocks.map(({ symbol }) => (
          <Link
            key={symbol}
            to={`/stocks/${symbol}`}
            className="flex flex-col items-center cursor-pointer gap-2   rounded-2xl  duration-200 hover:scale-101 sm:m-0.5 sm:gap-4 "
          >
            <StockLogo symbol={symbol} />
            <span className="line-clamp-2 text-2xs sm:font-[450]">
              {symbol}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewedSection;
