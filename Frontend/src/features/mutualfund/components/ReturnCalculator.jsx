import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@/hooks/useDebounce";
import { formatToINR } from "@/utils/formatters";
import NumberFlow from "@number-flow/react";
import { useMemo, useState } from "react";
import { useGetChart } from "../hooks/useGetChart";
import {
  calculateAbsoluteReturn,
  calculateSIPReturns,
} from "../utils/returnCalculatorHelper";
import SIPCalculationInfo from "./overlays/info/SIPCalculationInfo";

const TIME_OPTIONS = [
  { label: "1 year", year: 1 },
  { label: "3 years", year: 3 },
  { label: "5 years", year: 5 },
];

function ReturnCalculator({ fund }) {
  const { data: chartData } = useGetChart(fund?.scheme_code);
  const [type, setType] = useState("sip"); // Default to SIP calculator
  const [amount, setAmount] = useState(5000); // Default to ₹5,000 for SIP
  const debouncedValue = useDebounce(amount, 900);
  const [selectedYear, setSelectedYear] = useState(1); // Default to 1 year

  const switchCalculationType = (newType) => {
    setType(newType);
    // Switch default amount based on calculation type
    setAmount(newType === "sip" ? 5000 : 20000);
  };

  // Calculate everything using the unified utility function
  const result = useMemo(() => {
    if (type === "sip") {
      return calculateSIPReturns(chartData, amount, selectedYear);
    } else {
      return calculateAbsoluteReturn(
        amount,
        fund[`return_${selectedYear}y`],
        selectedYear,
      );
    }
  }, [type, chartData, debouncedValue, selectedYear, fund]);

  return (
    <Card className="text-muted-foreground bg-background border-0 pt-0 pb-4 sm:gap-8 sm:rounded-xl sm:border sm:py-10">
      <CardHeader className="px-0 sm:px-8">
        <CardTitle>
          <Button
            variant="ghost"
            onClick={() => switchCalculationType("sip")}
            className={`h-7 rounded-full px-3 text-xs font-normal hover:bg-transparent sm:px-4 sm:py-2 sm:text-sm sm:font-medium ${
              type === "sip"
                ? "text-primary border-primary bg-primary/10 hover:bg-primary/10 hover:text-primary sm:border"
                : ""
            }`}
          >
            Monthly SIP
          </Button>
          <Button
            variant="ghost"
            onClick={() => switchCalculationType("one-time")}
            className={`h-7 rounded-full px-3 text-xs font-normal hover:bg-transparent sm:px-4 sm:py-2 sm:text-sm sm:font-medium ${
              type === "one-time"
                ? "text-primary border-primary bg-primary/10 hover:bg-primary/10 hover:text-primary sm:border"
                : ""
            }`}
          >
            One-Time
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 sm:px-10">
        <div className="mt-4 flex items-center gap-2 font-semibold">
          <span className="text-primary sm:text-foreground text-lg tracking-tighter tabular-nums">
            {formatToINR(amount)}
          </span>
          <div className="sm:text-foreground flex items-center font-normal sm:text-base">
            <span>{type === "sip" ? "per month " : "one-time"}</span>
            {type === "sip" && <SIPCalculationInfo />}
          </div>
        </div>

        <Slider
          className="mt-6 cursor-pointer sm:mt-10 [&_[role=slider]]:h-6 [&_[role=slider]]:w-8 [&_[role=slider]]:rounded-lg sm:[&_[role=slider]]:h-8 sm:[&_[role=slider]]:w-12 sm:[&_[role=slider]]:border-2"
          value={[amount]}
          onValueChange={(newValue) => setAmount(newValue[0])}
          min={100}
          max={type === "sip" ? 50000 : 100000}
          step={500}
        />

        <div className="mt-8 flex items-center justify-between sm:mt-14 sm:justify-start">
          <span className="sm:text-base">Over the past</span>
          <div className="flex sm:ml-6 sm:gap-2">
            {TIME_OPTIONS.map((item) => (
              <Button
                key={item.year}
                variant="outline"
                onClick={() => setSelectedYear(item.year)}
                className={`sm:!border-border h-7 rounded-full !border-transparent !bg-transparent px-3 font-normal shadow-none sm:h-8 sm:w-20 sm:font-medium ${selectedYear === item.year && "sm:!bg-accent !bg-primary/10 text-primary sm:!border-foreground sm:text-foreground"}`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-border/50 flex flex-col items-start gap-2 border-t px-0 sm:px-10">
        <p className="text-sm sm:text-base">
          Total investment of {formatToINR(result.totalInvestment)}
        </p>
        <div className="text-foreground space-x-2 font-medium">
          <span className="text-sm sm:text-base">Would have become</span>
          <NumberFlow
            format={{ maximumFractionDigits: 0 }}
            value={result.finalValue}
            prefix="₹"
            className="text-md sm:text-base"
          />
          <NumberFlow
            value={result.returnPercentage}
            suffix="%"
            className={`${result.returnPercentage > 0 ? "text-positive" : "text-negative"} text-md sm:text-base`}
          />
          {type === "sip" && result.annualizedReturn && (
            <span className="text-muted-foreground text-sm">
              ({result.annualizedReturn.toFixed(2)}% XIRR)
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default ReturnCalculator;
