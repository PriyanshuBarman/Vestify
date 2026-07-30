import { useMemo } from "react";
import { useSelector } from "react-redux";

import SectionHeading from "@/components/SectionHeading";
import { selectActiveTabIndex } from "@/store/slices/stockSlice";

import { useGetPopularStocks } from "../../hooks/useGetPopularStocks";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";
import MoreStocksCard from "../MoreStocksCard";
import StockCard from "../StockCard";
import SectionError from "./SectionError";

function PopularStocksSection() {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const isActive = activeTabIndex === 0;

  const { data: stocks, isFetching, error, refetch } = useGetPopularStocks();

  const symbols = useMemo(() => {
    return (
      stocks
        ?.slice(0, 3)
        .map((stock) => stock.symbol)
        .filter(Boolean) || []
    );
  }, [stocks]);

  useSubscribeStock(symbols, { enabled: isActive });

  if (error) {
    return (
      <SectionError
        heading="Popular Stocks"
        isFetching={isFetching}
        error={error}
        refetch={refetch}
      />
    );
  }

  return (
    <section className="sm:px-0 px-4">
      <SectionHeading heading="Popular Stocks" className="px-0" />

      <div className="flex sm:flex-row flex-wrap overflow-x-auto scrollbar-none gap-3 sm:p-0.25 sm:gap-4">
        {stocks?.slice(0, 3).map((stock, index) => (
          <StockCard key={index} stock={stock} />
        ))}

        <MoreStocksCard
          stocks={stocks?.slice(3, 7)}
          moreLink="/stocks/popular"
        />
      </div>
    </section>
  );
}

export default PopularStocksSection;
