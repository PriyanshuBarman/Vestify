import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatToINR } from "@/utils/formatters";
import { getChangeColor } from "@/utils/helper";

function SinglePortfolioSummary({ summary, type = "stock", className }) {
  return (
    <Card
      className={cn("mx-2 rounded-[1.25rem] tabular-nums", className || "")}
    >
      <CardHeader className="flex flex-row justify-between space-y-0">
        <div>
          <CardDescription>Current</CardDescription>
          <CardTitle className="mt-1 text-lg leading-tight">
            {formatToINR(summary.current, 0)}
          </CardTitle>
        </div>
        <div>
          <CardDescription>Invested</CardDescription>
          <CardTitle className="mt-1 text-lg leading-tight">
            {formatToINR(summary.invested, 0)}
          </CardTitle>
        </div>
      </CardHeader>

      <Separator className="mx-auto data-[orientation=horizontal]:w-[90%]" />

      <CardContent className="space-y-4 text-sm mt-4">
        <div className="flex items-center justify-between">
          <span>Total returns</span>
          <span className={`font-medium ${getChangeColor(summary.pnl)}`}>
            {formatToINR(summary.pnl, 2)} ({summary.returnPercent?.toFixed(2)}%)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>1D returns</span>
          <span
            className={`font-medium ${getChangeColor(summary.dayChangeValue)}`}
          >
            {formatToINR(summary.dayChangeValue, 2)} (
            {summary.dayChangePercent?.toFixed(2)}%)
          </span>
        </div>
        {type === "mutual-fund" ? (
          <div className="flex items-center justify-between">
            <span>Total units</span>
            <span className="font-medium">{summary.units?.toFixed(3)}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span>Quantity</span>
            <span className="font-medium">{summary.quantity}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SinglePortfolioSummary;
