import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SectionHeading from "@/components/SectionHeading";
import { selectActiveTabIndex } from "@/store/slices/stockSlice";

import { BSE_INDICES } from "../../constants/bseIndices";
import { useGetGainers } from "../../hooks/useGetGainers";
import { useGetLosers } from "../../hooks/useGetLosers";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";
import MoreStocksCard from "../MoreStocksCard";
import FilterIndices from "../overlays/FilterIndices";
import StockCard from "../StockCard";
import SectionError from "./SectionError";

function TopMoversSection() {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const isActive = activeTabIndex === 0;

  const [activeTab, setActiveTab] = useState("gainers");
  const [selectedIndex, setSelectedIndex] = useState(BSE_INDICES[0].value); // Default "|BSE SENSEX|"

  const {
    data: gainers,
    isFetching: isGainersFetching,
    error: gainersError,
    refetch: refetchGainers,
  } = useGetGainers(selectedIndex);

  const {
    data: losers,
    isFetching: isLosersFetching,
    error: losersError,
    refetch: refetchLosers,
  } = useGetLosers(selectedIndex);

  const isGainers = activeTab === "gainers";
  const isFetching = isGainers ? isGainersFetching : isLosersFetching;

  const movers = isGainers ? gainers : losers;
  const error = isGainers ? gainersError : losersError;
  const refetch = isGainers ? refetchGainers : refetchLosers;

  const symbols = useMemo(() => {
    return (
      movers
        ?.slice(0, 3)
        .map((stock) => stock.symbol)
        .filter(Boolean) || []
    );
  }, [movers]);

  useSubscribeStock(symbols, { enabled: isActive });

  if (error) {
    return (
      <SectionError
        heading="Top Movers Today"
        isFetching={isFetching}
        error={error}
        refetch={refetch}
      />
    );
  }

  return (
    <section className="swiper-no-swiping sm:m-0.5 sm:px-0 px-4">
      <SectionHeading heading="Top Movers Today" className="p-0" />

      <div className="flex flex-wrap items-center gap-3">
        {["gainers", "losers"].map((tab) => (
          <Button
            key={tab}
            variant="outline"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full capitalize max-sm:text-2xs max-sm:h-8 max-sm:px-3 shadow-none ${
              activeTab === tab ? "ring bg-accent" : ""
            }`}
          >
            {tab}
          </Button>
        ))}
        <Separator orientation="vertical" className="h-6!" />
        <FilterIndices value={selectedIndex} onChange={setSelectedIndex} />
      </div>

      <div className="grid grid-cols-2 mt-4  sm:grid-cols-3 md:grid-cols-4 gap-3 sm:p-0.25 sm:gap-4">
        {movers?.slice(0, 3).map((item, index) => (
          <StockCard key={index} stock={item} />
        ))}

        <MoreStocksCard
          stocks={movers?.slice(3, 7)}
          moreLink="/stocks/top-movers"
        />
      </div>
    </section>
  );
}

export default TopMoversSection;
