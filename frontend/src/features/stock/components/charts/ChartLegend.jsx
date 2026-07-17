import NumberFlow from "@number-flow/react";

import { CardHeader } from "@/components/ui/card";
import { getChangeColor } from "@/utils/helper";

function ChartLegend({ live, selectedRange = "1D", returnMetrics = {} }) {
  const change =
    selectedRange === "1D" ? live.change : returnMetrics.returnValue;
  const changePercent =
    selectedRange === "1D"
      ? live.changePercent
      : returnMetrics.returnPercentage;

  return (
    <CardHeader className="gap-0 pl-4">
      <div className="flex items-center gap-2">
        <NumberFlow
          value={live.price}
          format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
          prefix="₹"
          className="text-2xl font-semibold sm:text-[1.65rem]"
        />
      </div>

      <div
        className={`text-xs font-medium tabular-nums sm:text-sm sm:font-semibold  ${getChangeColor(changePercent)}`}
      >
        {change?.toFixed(2)} ({changePercent?.toFixed(2)}%)
        <span className="text-muted-foreground"> {selectedRange}</span>
      </div>
    </CardHeader>
  );
}

export default ChartLegend;
