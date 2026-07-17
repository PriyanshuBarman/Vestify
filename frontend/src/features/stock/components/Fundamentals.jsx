import { InfoIcon } from "lucide-react";

import { formatToCompactINR } from "@/utils/formatters";

function Fundamentals({ stock }) {
  return (
    <section className="space-y-8 my-16">
      <div className="flex gap-2 items-center">
        <h3 className=" md:text-xl lg:text-2xl font-medium">Fundamentals</h3>
        <InfoIcon className="size-4" />
      </div>

      <div className="grid grid-cols-2 gap-x-8 md:gap-x-14 gap-y-6 mt-4">
        <Slot title="Market Cap" value={formatToCompactINR(stock.marketCap)} />
        <Slot title="P/E Ratio(TTM)" value={stock.trailingPE?.toFixed(2)} />
        <Slot title="P/B Ratio" value={stock.priceToBook?.toFixed(2)} />
        <Slot
          title="EPS(TTM)"
          value={stock.epsTrailingTwelveMonths?.toFixed(2)}
        />
        <Slot title="Book Value" value={stock.bookValue?.toFixed(2)} />
        <Slot title="Dividend Yield" value={stock.dividendYield?.toFixed(2)} />
      </div>
    </section>
  );
}

export default Fundamentals;

function Slot({ title, value }) {
  return (
    <div className="flex  items-center justify-between">
      <span className="text-xs sm:text-sm text-muted-foreground">{title}</span>
      <span className="font-medium max-sm:text-sm">{value}</span>
    </div>
  );
}
