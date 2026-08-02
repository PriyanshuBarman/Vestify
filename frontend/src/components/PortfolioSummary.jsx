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

function PortfolioSummary({ summary = {}, count, type = "stock" }) {
  return (
    <Card className="mx-4 rounded-3xl">
      <CardHeader>
        <CardDescription className="text-xs tracking-widest uppercase">
          HOLDINGS ({count})
        </CardDescription>
        <CardTitle className="text-xl leading-tight">
          {formatToINR(summary.current || 0)}
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
          <span
            className={`font-medium ${getChangeColor(summary.dayChangeValue || 0)}`}
          >
            {formatToINR(summary.dayChangeValue || 0, 2)} (
            {(summary.dayChangePercent || 0).toFixed(2)}%)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Total returns</span>
          <span className={`font-medium ${getChangeColor(summary.pnl || 0)}`}>
            {formatToINR(summary.pnl || 0, 2)} (
            {(summary.returnPercent || 0).toFixed(2)}%)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Invested</span>
          <span className="font-medium">
            {formatToINR(summary.invested || 0)}
          </span>
        </div>

        {type === "mutual-fund" && (
          <div className="flex items-center justify-between">
            <span>XIRR</span>
            <span className="font-medium">-</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PortfolioSummary;
