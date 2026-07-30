import { useMemo } from "react";
import { useNavigate } from "react-router";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import StockLogo from "@/components/StockLogo";
import { useGetLiveData } from "@/features/stock/hooks/useGetLiveData";
import { useSubscribeStock } from "@/features/stock/hooks/useSubscribeStock";
import { formatToCompactINR, formatToINR } from "@/utils/formatters";
import { getChangeColor } from "@/utils/helper";

function TableSM({
  stocks = [],
  isPending = false,
  activeColumnKey = "day_change",
  onColumnClick,
}) {
  const navigate = useNavigate();

  const symbols = useMemo(() => {
    return stocks.map((stock) => stock.symbol).filter(Boolean);
  }, [stocks]);

  useSubscribeStock(symbols);

  return (
    <ScrollArea className="overflow-x-auto">
      <Table className="table-fixed w-full">
        <TableBody>
          {stocks.map((stock) => (
            <TableRow
              key={stock.symbol}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <TableCell
                onClick={() => navigate(`/stocks/${stock.symbol}`)}
                className="flex items-center gap-3 py-3 pl-4"
              >
                <StockLogo symbol={stock.symbol} />
                <div className="min-w-0">
                  <h4 className="font-medium text-sm truncate max-w-[18ch]">
                    {stock.longName || stock.shortName}
                  </h4>
                  <span className="text-muted-foreground text-2xs uppercase font-medium">
                    {stock.symbol}
                  </span>
                </div>
              </TableCell>

              <TableCell
                className="w-[35%] active:bg-accent font-medium pr-4"
                onClick={onColumnClick}
              >
                <DynamicCellField
                  activeColumnKey={activeColumnKey}
                  stock={stock}
                />
              </TableCell>
            </TableRow>
          ))}

          {isPending && <TableRowSkeleton count={8} />}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default TableSM;

function DynamicCellField({ stock, activeColumnKey }) {
  const live = useGetLiveData(stock.symbol, { fallback: stock });

  const isPositive = live.change >= 0;
  const changeColor = getChangeColor(live.change);

  if (live.isPending) return null;

  if (activeColumnKey === "day_change")
    return (
      <div className="text-right">
        <span className=" text-sm">{formatToINR(live.price, 2)}</span>
        <p className={`text-xs  ${changeColor}`}>
          {formatToINR(live.change, 2)} ({isPositive ? "" : ""}
          {Number(live.changePercent ?? 0).toFixed(2)}%)
        </p>
      </div>
    );
  if (activeColumnKey === "market_cap")
    return (
      <div className="text-right text-xs  text-foreground">
        {stock.marketCap ? formatToCompactINR(stock.marketCap) : "-"}
      </div>
    );
  if (activeColumnKey === "volume")
    return (
      <div className="text-right text-xs  text-foreground">
        {live.volume ? Number(live.volume).toLocaleString() : "-"}
      </div>
    );
  if (activeColumnKey === "52w_high")
    return (
      <div className="text-right text-xs  text-foreground">
        {formatToINR(stock.fiftyTwoWeekHigh || live.dayHigh, 2)}
      </div>
    );
  if (activeColumnKey === "52w_low")
    return (
      <div className="text-right text-xs">
        {formatToINR(stock.fiftyTwoWeekLow || live.dayLow, 2)}
      </div>
    );
}

function TableRowSkeleton({ count = 8 }) {
  return Array.from({ length: count }).map((_, index) => (
    <TableRow key={index}>
      <TableCell className="flex items-center gap-3 py-3 pl-4">
        <Skeleton className="size-8 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </TableCell>

      <TableCell className="w-[35%] pr-4">
        <Skeleton className="ml-auto h-4 w-20" />
      </TableCell>
    </TableRow>
  ));
}
