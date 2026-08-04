import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

import { timeRanges } from "../../constants/chart";
import { isValidRange } from "../../utils/chartUtils";

const otherTimeRanges = timeRanges.filter((range) => range !== "1D");

function TimeRangeButtons({
  setSelectedRange,
  selectedRange,
  fullChartData,
  isLoading,
  isIntradayLoading,
  intradayChartError,
}) {
  const is1DDisabled =
    isLoading || isIntradayLoading || Boolean(intradayChartError);

  return (
    <CardFooter className="mt-4 flex justify-center  pb-2 gap-1.5 sm:mt-0 sm:gap-4 sm:border-t sm:pt-4">
      {/* 1D Intraday Button */}
      <Button
        variant="outline"
        onClick={() => {
          navigator?.vibrate?.(50);
          setSelectedRange("1D");
        }}
        disabled={is1DDisabled}
        className={cn(
          "text-muted-foreground sm:text-foreground  h-6.5 w-10 sm:h-8 sm:w-11 rounded-full  tabular-nums shadow-none border-transparent sm:border-border  text-xs",
          selectedRange === "1D" &&
            "border-foreground! text-foreground border bg-accent",
        )}
      >
        1D
      </Button>

      {/* Historical Time Range Buttons */}
      {otherTimeRanges.map((timePeriod) => (
        <Button
          variant="outline"
          key={timePeriod}
          onClick={() => {
            navigator?.vibrate?.(50);
            setSelectedRange(timePeriod);
          }}
          disabled={isValidRange(timePeriod, fullChartData) || isLoading}
          className={cn(
            "text-muted-foreground sm:text-foreground h-6.5 w-10 sm:h-8 sm:w-11  border-transparent sm:border-border rounded-full  tabular-nums shadow-none  text-xs",
            timePeriod === selectedRange &&
              "border-foreground! text-foreground border bg-accent",
          )}
        >
          {timePeriod}
        </Button>
      ))}
    </CardFooter>
  );
}

export default TimeRangeButtons;
