import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsLeftRightIcon } from "lucide-react";
import { useState } from "react";
import { formatToINR } from "@/utils/formatters";
import FundLogo from "../FundLogo";
import SortByButton from "../filters/SortByButton";
import { Button } from "@/components/ui/button";

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

function PortfolioTableSM({
  portfolio,
  sortOptions,
  activeSortBy,
  onSortChange,
  onOrderChange,
  order,
  columnsConfig,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColumn = columns[activeIndex];

  const handleNextColumn = () => {
    setActiveIndex((prev) => (prev + 1) % columns.length);
  };

  const getColor = (fund) => {
    switch (activeColumn.label) {
      case "Current (Invested)":
        return Number(fund.current) >= Number(fund.invested)
          ? "text-positive"
          : "text-negative";

      case "Returns (%)":
        return Number(fund.pnl) >= 0 ? "text-positive" : "text-negative";

      case "Day change (%)":
        return Number(fund.dayChangeValue) >= 0
          ? "text-positive"
          : "text-negative";

      default:
        return "text-positive";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 text-xs font-semibold sm:hidden">
        <SortByButton
          defaultSortBy="current"
          order={order}
          sortOptions={sortOptions}
          activeSortBy={activeSortBy}
          onSortChange={onSortChange}
          onOrderChange={onOrderChange}
          columnsConfig={columnsConfig}
        />
        <Button
          variant="ghost"
          onClick={handleNextColumn}
          className="border-muted-foreground flex h-auto items-center justify-end gap-1 rounded-xl !px-0 text-right text-xs font-semibold"
        >
          <ChevronsLeftRightIcon className="size-4 shrink-0" />
          <span className="border-muted-foreground border-b border-dashed">
            {activeColumn.label}
          </span>
        </Button>
      </div>
      <Table className="table-fixed">
        <TableBody>
          {portfolio?.map((fund) => (
            <TableRow key={fund.schemeCode}>
              <TableCell className="flex items-center gap-4 py-4 pl-4">
                <FundLogo noFormat fundHouseDomain={fund.fundHouseDomain} />

                <div>
                  <h4 className="font-medium text-wrap">
                    {fund.shortName} Fund
                  </h4>
                  <p className="text-muted-foreground mt-1 flex items-center text-xs font-medium">
                    {fund.fundType}
                  </p>
                </div>
              </TableCell>

              <TableCell onClick={handleNextColumn} className="w-[25%] pr-4">
                <span
                  className={`flex justify-end font-medium ${getColor(fund)}`}
                >
                  {formatToINR(fund[activeColumn.data1], 2)}
                </span>

                <p className="text-muted-foreground flex justify-end text-xs">
                  {activeIndex === 0 ? (
                    <>
                      ( <span> {activeColumn.unit2}</span>
                      <span>{fund[activeColumn.data2]} </span>)
                    </>
                  ) : (
                    <>
                      ( <span>{fund[activeColumn.data2]} </span>
                      <span> {activeColumn.unit2}</span>)
                    </>
                  )}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default PortfolioTableSM;
