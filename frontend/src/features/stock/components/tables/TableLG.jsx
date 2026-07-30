import { useMemo, useState } from "react";
import { SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StockLogo from "@/components/StockLogo";
import { useGetLiveData } from "@/features/stock/hooks/useGetLiveData";
import { useSubscribeStock } from "@/features/stock/hooks/useSubscribeStock";
import { formatToCompactINR, formatToINR } from "@/utils/formatters";
import { getChangeColor } from "@/utils/helper";

const COLUMNS_CONFIG = {
  price: { name: "Market price", shortName: "Market price" },
  market_cap: { name: "Market Cap", shortName: "Market cap" },
  volume: { name: "Volume", shortName: "Volume" },
  "52w_high": { name: "52W high", shortName: "52W high" },
  "52w_low": { name: "52W low", shortName: "52W low" },
};

const DEFAULT_COLUMNS = [
  "price",
  "market_cap",
  "volume",
  "52w_high",
  "52w_low",
];

function TableLG({ stocks = [], isPending = false }) {
  const navigate = useNavigate();
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);

  const symbols = useMemo(() => {
    return stocks.map((stock) => stock.symbol).filter(Boolean);
  }, [stocks]);

  useSubscribeStock(symbols);

  return (
    <ScrollArea className="h-[calc(100vh-140px)] overflow-auto rounded-3xl border">
      <Table>
        <TableHeader className="bg-accent sticky top-0 z-10 h-16">
          <TableRow>
            <TableHead className="text-muted-foreground pl-6 tabular-nums">
              Stock Name ({stocks.length} results)
            </TableHead>

            {visibleColumns.map((key) => (
              <TableHead key={key} className="text-center  font-semibold">
                {COLUMNS_CONFIG[key]?.shortName}
              </TableHead>
            ))}

            <TableHead className="w-20 text-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full text-xs"
                  >
                    <SettingsIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 rounded-xl p-2" align="end">
                  <div className="flex flex-col gap-1">
                    {Object.keys(COLUMNS_CONFIG).map((key) => (
                      <Label
                        key={key}
                        className="hover:bg-accent flex items-center gap-3 rounded-lg py-2 px-3 cursor-pointer text-xs"
                      >
                        <Checkbox
                          checked={visibleColumns.includes(key)}
                          onCheckedChange={() => {
                            setVisibleColumns((prev) =>
                              prev.includes(key)
                                ? prev.filter((col) => col !== key)
                                : [...prev, key],
                            );
                          }}
                          className="size-4"
                        />
                        {COLUMNS_CONFIG[key]?.name}
                      </Label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {stocks.map((stock) => (
            <TableRow
              key={stock.symbol}
              onClick={() => navigate(`/stocks/${stock.symbol}`)}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <TableCell className="flex items-center gap-6 py-4 pl-6">
                <StockLogo symbol={stock.symbol} />
                <div>
                  <h4 className="font-[450] text-base">
                    {stock.longName || stock.shortName}
                  </h4>
                  <span className="text-muted-foreground text-xs uppercase ]">
                    {stock.symbol}
                  </span>
                </div>
              </TableCell>

              {visibleColumns.map((colKey) => (
                <TableCell key={colKey} className="text-center text-md font-">
                  <DynamicCellFieldLG stock={stock} columnKey={colKey} />
                </TableCell>
              ))}

              <TableCell />
            </TableRow>
          ))}

          {isPending && (
            <TableRowSkeleton count={8} visibleColumns={visibleColumns} />
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default TableLG;

function DynamicCellFieldLG({ stock, columnKey }) {
  const live = useGetLiveData(stock.symbol, { fallback: stock });

  const isPositive = live.change >= 0;
  const changeColor = getChangeColor(live.change);

  if (live.isPending) return null;

  if (columnKey === "price")
    return (
      <div className="flex flex-col text-foreground">
        <span>{formatToINR(live.price, 2)}</span>
        <span className={` ${changeColor}`}>
          {isPositive ? "+" : ""}
          {formatToINR(live.change, 2)} ({isPositive ? "+" : ""}
          {Number(live.changePercent ?? 0).toFixed(2)}%)
        </span>
      </div>
    );

  if (columnKey === "market_cap")
    return (
      <div className="text-right  text-foreground">
        {stock.marketCap ? formatToCompactINR(stock.marketCap) : "-"}
      </div>
    );

  if (columnKey === "volume")
    return (
      <span className=" text-foreground">
        {live.volume ? Number(live.volume).toLocaleString() : "-"}
      </span>
    );

  if (columnKey === "52w_high")
    return (
      <span className=" text-foreground">{formatToINR(live.dayHigh, 2)}</span>
    );

  if (columnKey === "52w_low")
    return <span>{formatToINR(live.dayLow, 2)}</span>;

  return null;
}

function TableRowSkeleton({ count = 8, visibleColumns }) {
  return Array.from({ length: count }).map((_, index) => (
    <TableRow key={index}>
      <TableCell className="flex items-center gap-4 py-4 pl-6">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-20" />
        </div>
      </TableCell>

      {visibleColumns.map((colKey) => (
        <TableCell key={colKey} className="text-center">
          <Skeleton className="mx-auto h-4 w-20" />
        </TableCell>
      ))}

      <TableCell />
    </TableRow>
  ));
}
