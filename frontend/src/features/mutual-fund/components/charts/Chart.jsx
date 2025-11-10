import { CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { useGetChart } from "../../hooks/useGetChart";
import { getSelectedRangeData, isValidRange } from "../../utils/chartHelper";
import ChartLegend from "./ChartLegend";
import CustomTooltipContent from "./CustomTooltipContent";
import TimeRangeBtns from "./TimeRangeBtns";
import { useIsMobile } from "@/hooks/useIsMobile";

const returnMapping = {
  "1M": "return_1m",
  "6M": "return_6m",
  "1Y": "return_1y",
  "3Y": "return_3y",
  "5Y": "return_5y",
  All: "return_since_inception",
};

function Chart({ fund }) {
  const isMobile = useIsMobile();
  const { data: fullChartData = [], isLoading } = useGetChart(fund.scheme_code);
  const [selectedRange, setSelectedRange] = useState("3Y");

  useEffect(() => {
    isValidRange("3Y", fullChartData)
      ? setSelectedRange("All")
      : setSelectedRange("3Y");
  }, [fullChartData]);

  const selectedChartData = getSelectedRangeData(fullChartData, selectedRange);
  const returnPercent = fund[returnMapping[selectedRange]]; // return-percent for the selected range

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
        selectedRange={selectedRange}
        fund={fund}
        returnPercent={returnPercent}
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
                  (dataMin) => dataMin - dataMin * 0.05,
                  (dataMax) => dataMax + dataMax * 0.01,
                ]}
                hide
              />
            )}
            <ChartTooltip content={<CustomTooltipContent />} />
            <Line
              isAnimationActive={false}
              dataKey="nav"
              type="monotone"
              stroke={
                returnPercent >= 0 ? "var(--positive)" : "var(--negative)"
              }
              color="#FFFFFF"
              strokeWidth={isMobile ? 1.5 : 2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <TimeRangeBtns
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        fullChartData={fullChartData}
      />
    </div>
  );
}

export default Chart;
