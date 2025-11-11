import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatToINR } from "@/utils/formatters";
import { getChangeColor } from "@/utils/helper";

function FundPortfolioSummary({ fund, className }) {
  return (
    <Card className={cn("mx-2 tabular-nums", className || "")}>
      <CardHeader className="flex justify-between">
        <div>
          <CardDescription>Current</CardDescription>
          <CardTitle className="mt-2 text-lg leading-tight">
            {formatToINR(fund.current, 0)}
          </CardTitle>
        </div>
        <div>
          <CardDescription>Invested</CardDescription>
          <CardTitle className="mt-2 text-lg leading-tight">
            {formatToINR(fund.invested, 0)}
          </CardTitle>
        </div>
      </CardHeader>

      <Separator className="mx-auto data-[orientation=horizontal]:w-[90%]" />

      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span>Total returns</span>
          <span className={`font-medium ${getChangeColor(fund.pnl)}`}>
            {formatToINR(fund.pnl, 2)} ({fund.returnPercent?.toFixed(2)}%)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>1D returns</span>
          <span
            className={`font-medium ${getChangeColor(fund.dayChangeValue)}`}
          >
            {formatToINR(fund.dayChangeValue, 2)}(
            {fund.dayChangePercent?.toFixed(2)}%)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total units</span>
          <span className="font-medium">{fund.units.toFixed(3)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default FundPortfolioSummary;
