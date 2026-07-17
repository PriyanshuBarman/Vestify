import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

import { timeRanges } from "../../constants/chart";
import { isValidRange } from "../../utils/chartUtils";

function TimeRangeBtns({
  setSelectedRange,
  selectedRange,
  fullChartData,
  isLoading,
  isIntradayLoading,
}) {
  return (
    <CardFooter className="mt-4 flex justify-center gap-1.5 pb-2 sm:mt-0 sm:gap-4 sm:border-t sm:pt-4">
      {timeRanges.map((timePeriod) => (
        <Button
          variant="outline"
          key={timePeriod}
          onClick={() => {
            navigator.vibrate(50);
            setSelectedRange(timePeriod);
          }}
          disabled={
            isValidRange(timePeriod, fullChartData) ||
            isLoading ||
            (timePeriod === "1D" && isIntradayLoading)
          }
          className={`text-muted-foreground sm:text-foreground h-8 w-11 rounded-full !bg-transparent tabular-nums shadow-none max-sm:border-0 sm:text-xs ${timePeriod === selectedRange && "!border-foreground sm:!bg-accent !bg-primary/10 text-primary sm:text-foreground"}`}
        >
          {timePeriod}
        </Button>
      ))}
    </CardFooter>
  );
}

export default TimeRangeBtns;
