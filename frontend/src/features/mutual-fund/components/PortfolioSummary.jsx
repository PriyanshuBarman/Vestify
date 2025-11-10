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
import { ChartNoAxesCombinedIcon } from "lucide-react";
import { toast } from "sonner";
import { useGetPortfolioSummary } from "../hooks/useGetPortfolioSummary";
import { getChangeColor } from "../../../utils/helper";

function PortFolioSummary({ count }) {
  const { data = {} } = useGetPortfolioSummary();

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
      <CardContent className="sm:text-md space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span>1D returns</span>
          <span
            className={`font-medium ${getChangeColor(data.dayChangeValue)}`}
          >
            {formatToINR(data.dayChangeValue, 2)}(
            {data.dayChangePercent?.toFixed(2)}%)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total returns</span>
          <span className={`font-medium ${getChangeColor(data.pnl)}`}>
            {formatToINR(data.pnl, 2)} ({data.returnPercent?.toFixed(2)}%)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Invested</span>
          <span className="font-medium">{formatToINR(data.invested)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>XIRR</span>
          <span className="font-medium">-</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default PortFolioSummary;
