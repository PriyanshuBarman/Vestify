import { InfoIcon } from "lucide-react";

import { useGetLiveStockField } from "../hooks/useGetLiveStockField";
import PriceRange from "./PriceRange";

function Performance({ stock }) {
  const live = useGetLiveStockField(stock.symbol);

  return (
    <section className="space-y-8">
      <div className="flex gap-2 items-center">
        <h3 className="md:text-xl lg:text-2xl font-medium">Performance</h3>
        <InfoIcon className="size-4" />
      </div>

      <PriceRange
        leftTitle="Today's low"
        rightTitle="Today's high"
        high={live.dayHigh}
        low={live.dayLow}
        current={live.price}
      />

      <PriceRange
        leftTitle="52 week low"
        rightTitle="52 week high"
        high={live.fiftyTwoWeekHigh}
        low={live.fiftyTwoWeekLow}
        current={live.price}
      />

      <div className="flex justify-around mt-2">
        <Slot title="Open price" value={stock.regularMarketOpen} />
        <Slot title="Previous close" value={stock.regularMarketPreviousClose} />
        <Slot title="Live volume" value={live.volume} />
      </div>
    </section>
  );
}

export default Performance;

function Slot({ title, value }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-xs text-muted-foreground">{title}</span>
      <span className="font-medium max-sm:text-sm max-sm:mt-1">
        {value?.toLocaleString("en-IN")}
      </span>
    </div>
  );
}
