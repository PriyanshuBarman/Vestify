import { CardHeader } from "@/components/ui/card";
import NumberFlow from "@number-flow/react";

function ChartLegend({ selectedRange, fund, returnPercent }) {
  return (
    <CardHeader className="gap-0 pl-4">
      <div className="flex items-center gap-2">
        {returnPercent ? (
          <NumberFlow
            value={returnPercent || 0}
            suffix="%"
            className={`text-2xl font-semibold sm:text-[1.65rem] ${!returnPercent || returnPercent >= 0 ? "text-positive" : "text-negative"}`}
          />
        ) : (
          <span className="text-muted-foreground text-2xl font-semibold sm:text-[1.65rem]">
            0%
          </span>
        )}
        <span className="text-muted-foreground/90 text-xs font-medium sm:text-sm sm:font-semibold">
          {selectedRange}
          {selectedRange.includes("Y") && selectedRange !== "1Y"
            ? " annualized"
            : " return"}
        </span>
      </div>

      <div className="text-xs font-medium tabular-nums sm:text-sm sm:font-semibold">
        <span
          className={`${fund.day_change_percent >= 0 ? "text-positive" : "text-negative"}`}
        >
          {fund.day_change_percent > 0 ? "+" : ""}
          {fund.day_change_percent}%
        </span>
        <span className="text-muted-foreground"> 1D</span>
      </div>
    </CardHeader>
  );
}

export default ChartLegend;
