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
import { useIsMobile } from "@/hooks/useIsMobile";
import { formatToINR } from "@/utils/formatters";
import {
  BriefcaseBusinessIcon,
  ChartNoAxesCombinedIcon,
  PieChartIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useGetPortfolioSummary } from "../hooks/useGetPortfolioSummary";
import { toast } from "sonner";

function PortFolioSummary({ count }) {
  const { data = {} } = useGetPortfolioSummary();
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <Card className="mx-4">
        <CardHeader>
          <CardDescription className="text-xs tracking-widest">
            HOLDINGS ({count})
          </CardDescription>
          <CardTitle className="text-xl leading-tight">
            {formatToINR(data.current)}
          </CardTitle>
          <CardAction>
            <Button
              onClick={() => toast("Comming Soon")}
              variant="icon"
              className="size-9 rounded-full border"
            >
              <ChartNoAxesCombinedIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <Separator className="mx-auto data-[orientation=horizontal]:w-[90%]" />
        <CardContent className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">1D returns</span>
            <span className="text-primary font-medium">
              {formatToINR(data.dayChangeValue, 2)}(
              {data.dayChangePercent?.toFixed(2)}%)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total returns</span>
            <span className="text-primary font-medium">
              {formatToINR(data.pnl, 2)} ({data.returnPercent?.toFixed(2)}%)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Invested</span>
            <span className="font-medium">{formatToINR(data.invested)}</span>
          </div>
        </CardContent>
      </Card>
    );

  // Desktop Version
  return (
    <div className="mx-4 mb-8 grid grid-cols-2 overflow-hidden rounded-xl border tabular-nums sm:gap-4 sm:rounded-none sm:border-none lg:grid-cols-4">
      {/* Invested Amount Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-xl sm:border sm:py-6">
        <div>
          <h5 className="text-muted-foreground text-sm sm:text-sm sm:font-semibold">
            Invested
          </h5>
          <p className="mt-1 text-sm font-medium sm:text-xl md:text-xl">
            {formatToINR(data.invested)}
          </p>
        </div>
        <PieChartIcon className="text-primary hidden size-8 sm:block" />
      </div>

      {/* Current Market Value Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-xl sm:border sm:py-6">
        <div>
          <h5 className="text-muted-foreground text-sm sm:text-sm sm:font-semibold">
            Current
          </h5>
          <p
            className={`mt-1 text-sm font-medium sm:text-xl md:text-xl ${Number(data.current) >= Number(data.invested) ? "text-positive" : "text-negative"}`}
          >
            {formatToINR(data.current, 2)}
          </p>
        </div>
        <BriefcaseBusinessIcon className="hidden size-8 sm:block" />
      </div>

      {/* Total Returns Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-xl sm:border sm:py-6">
        <div>
          <h5 className="text-muted-foreground text-sm sm:text-sm sm:font-semibold">
            Total Returns
          </h5>
          <p
            className={`mt-1 text-sm font-medium sm:text-xl md:text-xl ${data.returnPercent >= 0 ? "text-positive" : "text-negative"}`}
          >
            {formatToINR(data.pnl, 2)} ({data.returnPercent?.toFixed(2)}%)
          </p>
        </div>
        {data.returnPercent >= 0 ? (
          <TrendingUpIcon className="text-positive hidden size-8 sm:block" />
        ) : (
          <TrendingDownIcon className="text-negative hidden size-8 sm:block" />
        )}
      </div>

      {/* 1 Day Change Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-xl sm:border sm:py-6">
        <div>
          <h5 className="text-muted-foreground text-sm sm:text-sm sm:font-semibold">
            1 Day Change
          </h5>
          <p
            className={`mt-1 text-sm font-medium sm:text-xl md:text-xl ${data.dayChangePercent >= 0 ? "text-positive" : "text-negative"}`}
          >
            {formatToINR(data.dayChangeValue, 2)}(
            {data.dayChangePercent?.toFixed(2)}%)
          </p>
        </div>
        {data.dayChangePercent >= 0 ? (
          <TrendingUpIcon className="text-positive hidden size-8 sm:block" />
        ) : (
          <TrendingDownIcon className="text-negative hidden size-8 sm:block" />
        )}
      </div>
    </div>
  );
}

export default PortFolioSummary;
