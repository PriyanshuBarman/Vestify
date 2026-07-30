import { formatToCompactINR } from "@/utils/formatters";

function Fundamentals({ stock }) {
  return (
    <div className="grid grid-cols-2 px-4 sm:px-0 sm:mt-14 mt-6 gap-x-8 md:gap-x-14 gap-y-6">
      <Slot
        title="Mkt Cap"
        value={stock.marketCap && formatToCompactINR(stock.marketCap)}
      />
      <Slot title="P/E Ratio(TTM)" value={stock.trailingPE?.toFixed(2)} />
      <Slot title="P/B Ratio" value={stock.priceToBook?.toFixed(2)} />
      <Slot
        title="EPS(TTM)"
        value={stock.epsTrailingTwelveMonths?.toFixed(2)}
      />
      <Slot title="Book Value" value={stock.bookValue?.toFixed(2)} />
      <Slot
        title="Dividend Yield"
        value={stock.dividendYield?.toFixed(2) ?? "-"}
      />
    </div>
  );
}

export default Fundamentals;

function Slot({ title, value }) {
  return (
    <div className="flex  items-center justify-between">
      <span className="text-xs sm:text-base text-muted-foreground">
        {title}
      </span>
      <span className="font-medium max-sm:text-sm">{value}</span>
    </div>
  );
}
