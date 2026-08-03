import { useState } from "react";
import { ChevronsLeftRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import StockLogo from "@/components/StockLogo";
import SortByButton from "@/features/mutual-fund/components/filters/SortByButton";
import { formatToINR } from "@/utils/formatters";
import { getChangeColor } from "@/utils/helper";

const columns = [
  {
    label: "Current (Invested)",
    data1: "current",
    data2: "invested",
    unit2: "₹",
  },
  {
    label: "Returns (%)",
    data1: "pnl",
    data2: "returnPercent",
    unit2: "%",
  },
  {
    label: "Day change (%)",
    data1: "dayChangeValue",
    data2: "dayChangePercent",
    unit2: "%",
  },
];

function PortfolioTable({
  portfolio = [],
  sortOptions,
  activeSortBy,
  onSortChange,
  onOrderChange,
  onStockClick,
  order,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColumn = columns[activeIndex];

  const handleNextColumn = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % columns.length);
  };

  const getColor = (stock) => {
    switch (activeColumn.label) {
      case "Current (Invested)":
        return getChangeColor(stock.invested, stock.current);
      case "Returns (%)":
        return getChangeColor(stock.pnl);
      case "Day change (%)":
        return getChangeColor(stock.dayChangeValue);
      default:
        return "text-foreground";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 text-xs font-semibold">
        <SortByButton
          className="font-semibold sm:rounded-xl sm:p-2 sm:text-sm"
          defaultSortBy="current"
          order={order}
          sortOptions={sortOptions}
          activeSortBy={activeSortBy}
          onSortChange={onSortChange}
          onOrderChange={onOrderChange}
        />

        <Button
          variant="ghost"
          onClick={handleNextColumn}
          className="border-muted-foreground  active:bg-accent flex h-auto items-center justify-end gap-1 pr-0! text-right text-xs font-semibold sm:h-10 sm:pr-2! sm:text-sm"
        >
          <ChevronsLeftRightIcon className="size-4 shrink-0" />
          <span className="border-muted-foreground border-b border-dashed">
            {activeColumn.label}
          </span>
        </Button>
      </div>

      <Table className="table-fixed">
        <TableBody>
          {portfolio?.map((stock) => (
            <TableRow
              key={stock.id || stock.symbol}
              onClick={() => onStockClick(stock)}
              className="cursor-pointer"
            >
              <TableCell className="flex items-center gap-4 py-4 pl-4">
                <StockLogo symbol={stock.symbol} />

                <div>
                  <h4 className="sm:text-md font-medium text-wrap">
                    {stock.shortName || stock.name || stock.symbol}
                  </h4>
                  <span className="text-muted-foreground mt-0.5 flex items-center text-xs font-medium">
                    {stock.quantity} {stock.quantity === 1 ? "share" : "shares"}
                  </span>
                </div>
              </TableCell>

              <TableCell
                onClick={handleNextColumn}
                className="w-[30%] active:bg-accent pr-4"
              >
                <span
                  className={`flex justify-end font-medium sm:text-base ${getColor(stock)}`}
                >
                  {formatToINR(stock[activeColumn.data1], 2)}
                </span>

                <p className="text-muted-foreground flex justify-end text-xs sm:text-sm">
                  {activeIndex === 0 ? (
                    <span>({formatToINR(stock[activeColumn.data2], 2)})</span>
                  ) : (
                    <span>
                      ({Number(stock[activeColumn.data2] || 0).toFixed(2)}
                      {activeColumn.unit2})
                    </span>
                  )}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PortfolioTable;
