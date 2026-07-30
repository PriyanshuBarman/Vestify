import { useEffect, useMemo, useState } from "react";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { InfoIcon } from "lucide-react";
import { Line, LineChart, XAxis, YAxis } from "recharts";

import { useIsMobile } from "@/hooks/useIsMobile";
import { CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

import { useGetChart } from "../../hooks/useGetChart";
import { useGetIntradayChart } from "../../hooks/useGetIntradayChart";
import {
  calculateReturnMetrics,
  getChartColor,
  getSelectedRangeData,
  isValidRange,
  mergeIntradayDataWithMarketDay,
} from "../../utils/chartUtils";
import ChartLegend from "./ChartLegend";
import CustomTooltipContent from "./CustomTooltipContent";
import TimeRangeButtons from "./TimeRangeButtons";

function Chart({ symbol }) {
  const isMobile = useIsMobile();
  const { data: fullChartData = [], isLoading } = useGetChart(symbol);
  const [selectedRange, setSelectedRange] = useState("3Y");
  const isIntraday = selectedRange === "1D";

  const {
    live,
    data: intradayChart,
    isLoading: isIntradayLoading,
    error: intradayChartError,
  } = useGetIntradayChart(symbol, isIntraday);

  useEffect(() => {
    if (intradayChartError && selectedRange === "1D") {
      setSelectedRange("3Y");
    }
  }, [intradayChartError, selectedRange]);

  useEffect(() => {
    isValidRange("3Y", fullChartData)
      ? setSelectedRange("All")
      : setSelectedRange("3Y");
  }, [fullChartData]);

  const selectedChartData = isIntraday
    ? mergeIntradayDataWithMarketDay(intradayChart) || []
    : getSelectedRangeData(fullChartData, selectedRange);

  const returnMetrics = calculateReturnMetrics(
    selectedChartData,
    live.price,
    selectedRange,
  );

  const isPreviousDayChart = useMemo(() => {
    if (selectedRange !== "1D" || !intradayChart?.length) return false;

    const lastPoint = intradayChart[intradayChart.length - 1];
    if (!lastPoint?.date) return false;

    const lastDate = new Date(lastPoint.date);
    if (isNaN(lastDate.getTime())) return false;

    const todayIST = format(TZDate.tz("Asia/Kolkata"), "yyyy-MM-dd");
    const chartIST = format(new TZDate(lastDate, "Asia/Kolkata"), "yyyy-MM-dd");

    return chartIST !== todayIST;
  }, [selectedRange, intradayChart]);

  return (
    <div className="relative overflow-x-hidden">
      {isLoading && (
        <img
          className="absolute top-1/2 left-1/2 m-auto size-15 -translate-1/2 animate-pulse"
          alt="loading icon"
          src="/electric.svg"
        />
      )}
      <ChartLegend
        live={live}
        selectedRange={selectedRange}
        returnMetrics={returnMetrics}
      />
      <CardContent className="mt-6 px-2">
        <ChartContainer
          className="h-50 w-full sm:h-78"
          config={{
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          }}
        >
          <LineChart accessibilityLayer data={selectedChartData}>
            <XAxis dataKey="date" hide />

            {fullChartData.length && (
              <YAxis
                domain={[
                  (dataMin) => dataMin - dataMin * (isIntraday ? 0.005 : 0.05),
                  (dataMax) => dataMax + dataMax * (isIntraday ? 0.005 : 0.01),
                ]}
                hide
              />
            )}
            <ChartTooltip
              content={<CustomTooltipContent showTimeOnly={isIntraday} />}
            />
            <Line
              connectNulls={true}
              isAnimationActive={false}
              dataKey="close"
              type="monotone"
              stroke={getChartColor(selectedRange, live, returnMetrics)}
              color="#FFFFFF"
              strokeWidth={isMobile ? 2 : 2.5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <TimeRangeButtons
        isLoading={isLoading}
        isIntradayLoading={isIntradayLoading}
        intradayChartError={intradayChartError}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        fullChartData={fullChartData}
      />
      {selectedRange === "1D" && isPreviousDayChart && (
        <div className="mt-3 sm:mt-6 bg-accent rounded-lg py-2 px-4 w-fit mx-auto flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <InfoIcon className="size-3.5 shrink-0 text-muted-foreground/80" />
          <span>Showing previous business day&apos;s chart</span>
        </div>
      )}
    </div>
  );
}

export default Chart;
