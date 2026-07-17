import SectionHeading from "@/components/SectionHeading";

import { useGetpopularStocks } from "../../hooks/useGetPopularStocks";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";
import StockCard from "../StockCard";

function PopularStocksSection() {
  const { data: stocks } = useGetpopularStocks();

  const symbols = stocks?.map((stock) => stock.symbol);
  useSubscribeStock(symbols);

  return (
    <section>
      <SectionHeading heading="Popular Stocks" />

      <div className="flex justify-between max-sm:flex-wrap overflow-x-auto scrollbar-none gap-3 px-4 sm:p-0.5 sm:gap-3">
        {stocks?.map((stock, index) => (
          <StockCard
            key={stock.symbol || index}
            name={stock.longName}
            symbol={stock.symbol}
          />
        ))}
      </div>
    </section>
  );
}

export default PopularStocksSection;
