import { Pie, PieChart } from "recharts";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export const description = "A donut chart";

function FutureValuePieChart({ investedAmount, estReturn }) {
  const isMobile = useIsMobile();
  const chartData = [
    {
      name: "Invested Amount",
      value: investedAmount,
      fill: "#04ad834f",
    },
    {
      name: "Estimated Returns",
      value: estReturn,
      fill: "#04ad83",
    },
  ];

  const chartConfig = {
    value: {
      label: "Amount (₹)",
    },
    "Invested Amount": {
      label: "Invested Amount",
      color: "#04ad834f",
    },
    "Estimated Returns": {
      label: "Estimated Returns",
      color: "#04ad83",
    },
  };

  return (
    <Card className="flex flex-col justify-center border-none bg-transparent lg:w-1/2">
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] sm:max-h-[300px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={isMobile ? 60 : 80}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="gap-4 text-xs sm:flex-col sm:text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          <div className="h-2 w-10 rounded-full bg-[#04ad834f] sm:h-4"></div>
          Invested amount
        </div>
        <div className="flex items-center gap-2 leading-none font-medium">
          <div className="h-2 w-10 rounded-full bg-[#04ad83] sm:h-4"></div>
          Estimated returns
        </div>
      </CardFooter>
    </Card>
  );
}

export default FutureValuePieChart;
