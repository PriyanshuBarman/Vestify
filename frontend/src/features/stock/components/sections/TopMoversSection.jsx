import { useState } from "react";

import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

import { useGetGainers } from "../../hooks/useGetGainers";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";
import StockCard from "../StockCard";

function TopMoversSection() {
  const [activeTab, setActiveTab] = useState("gainers");
  const { data: gainers } = useGetGainers();
  const symbols = gainers?.slice(0, 3).map((stock) => stock.symbol);
  useSubscribeStock(symbols);

  const tabs = ["gainers", "losers"];

  return (
    <section className="swiper-no-swiping sm:m-0.5 sm:px-0 px-4">
      <SectionHeading heading="Top Movers today" className="p-0" />

      <div className="space-x-2">
        {tabs.map((tab) => (
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
      </div>

      <div className="flex flex-wrap justify-between mt-4 gap-3 sm:mt-6 sm:gap-3">
        {gainers?.slice(0, 4).map((item, index) => (
          <StockCard
            key={item.symbol || index}
            symbol={item.symbol}
            name={item.name}
          />
        ))}
      </div>
    </section>
  );
}
export default TopMoversSection;
