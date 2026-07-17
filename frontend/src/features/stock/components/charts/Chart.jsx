import { useEffect, useState } from "react";
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
import TimeRangeBtns from "./TimeRangeBtns";

function Chart({ symbol }) {
  const isMobile = useIsMobile();
  const { data: fullChartData = [], isLoading } = useGetChart(symbol);
  const [selectedRange, setSelectedRange] = useState("3Y");
  const isIntraday = selectedRange === "1D";

  const {
    live,
    data: intradayChart,
    isLoading: isIntradayLoading,
  } = useGetIntradayChart(symbol, isIntraday);

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
                  (dataMax) => dataMax + dataMax * 0.01,
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
      <TimeRangeBtns
        isLoading={isLoading}
        isIntradayLoading={isIntradayLoading}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        fullChartData={fullChartData}
      />
    </div>
  );
}

export default Chart;
