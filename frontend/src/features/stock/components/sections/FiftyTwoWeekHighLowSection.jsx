import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SectionHeading from "@/components/SectionHeading";
import { selectActiveTabIndex } from "@/store/slices/stockSlice";

import { BSE_INDICES } from "../../constants/bseIndices";
import { useGet52WeekHighLow } from "../../hooks/useGet52WeekHighLow";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";
import MoreStocksCard from "../MoreStocksCard";
import FilterIndices from "../overlays/FilterIndices";
import StockCard from "../StockCard";
import SectionError from "./SectionError";

function FiftyTwoWeekHighLowSection() {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const isActive = activeTabIndex === 0;

  const [activeTab, setActiveTab] = useState("highs");
  const [selectedIndex, setSelectedIndex] = useState(BSE_INDICES[1].value); // Default "|BSE 100|"

  const { data, isFetching, error, refetch } =
    useGet52WeekHighLow(selectedIndex);

  const isHighs = activeTab === "highs";
  const stocks = isHighs ? data?.highs : data?.lows;

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
        heading="52 Week High & Low"
        isFetching={isFetching}
        error={error}
        refetch={refetch}
      />
    );
  }

  return (
    <section className="sm:m-0.5 sm:px-0 px-4">
      <SectionHeading heading="52 Week High & Low" className="px-0" />

      <div className="flex flex-wrap items-center gap-3">
        {[
          { key: "highs", label: "52W High" },
          { key: "lows", label: "52W Low" },
        ].map((tab) => (
          <Button
            key={tab.key}
            variant="outline"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full capitalize max-sm:text-2xs max-sm:h-8 max-sm:px-3 shadow-none ${
              activeTab === tab.key ? "ring bg-accent" : ""
            }`}
          >
            {tab.label}
          </Button>
        ))}

        <Separator orientation="vertical" className="h-6!" />
        <FilterIndices value={selectedIndex} onChange={setSelectedIndex} />
      </div>

      <div className="grid grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:p-0.25 sm:gap-4">
        {stocks?.length ? (
          <>
            {stocks.slice(0, 3).map((item, index) => (
              <StockCard key={index} stock={item} />
            ))}
            <MoreStocksCard
              stocks={stocks?.slice(3, 7)}
              moreLink="/stocks/52-week-high-low"
            />
          </>
        ) : (
          <div className="mt-12 w-full text-center text-sm font-medium">
            No Stocks Found
          </div>
        )}
      </div>
    </section>
  );
}

export default FiftyTwoWeekHighLowSection;
