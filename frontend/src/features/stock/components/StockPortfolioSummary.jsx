import { ChartNoAxesCombinedIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatToINR } from "@/utils/formatters";
import { getChangeColor } from "@/utils/helper";

function StockPortfolioSummary({ count, summary = {} }) {
  const current = summary.current || 0;
  const invested = summary.invested || 0;
  const pnl = summary.pnl || 0;
  const returnPercent = summary.returnPercent || 0;
  const dayChangeValue = summary.dayChangeValue || 0;
  const dayChangePercent = summary.dayChangePercent || 0;

  return (
    <Card className="mx-4 rounded-3xl">
      <CardHeader>
        <CardDescription className="text-xs tracking-widest uppercase">
          HOLDINGS ({count})
        </CardDescription>
        <CardTitle className="text-xl leading-tight">
          {formatToINR(current)}
        </CardTitle>
        <CardAction>
          <Button variant="icon" className="size-9 rounded-full border">
            <ChartNoAxesCombinedIcon />
          </Button>
        </CardAction>
      </CardHeader>

      <Separator className="mx-auto data-[orientation=horizontal]:w-[90%]" />

      <CardContent className="sm:text-md space-y-4 text-sm pt-4">
        <div className="flex items-center justify-between">
          <span>1D returns</span>
          <span className={`font-medium ${getChangeColor(dayChangeValue)}`}>
            {formatToINR(dayChangeValue, 2)} ({dayChangePercent.toFixed(2)}%)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Total returns</span>
          <span className={`font-medium ${getChangeColor(pnl)}`}>
            {formatToINR(pnl, 2)} ({returnPercent.toFixed(2)}%)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Invested</span>
          <span className="font-medium">{formatToINR(invested)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default StockPortfolioSummary;
