import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatToINR } from "@/utils/formatters";
import { ChevronsLeftRightIcon } from "lucide-react";
import { useState } from "react";
import FundLogo from "../FundLogo";
import SortByButton from "../filters/SortByButton";
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
  portfolio,
  sortOptions,
  activeSortBy,
  onSortChange,
  onOrderChange,
  order,
  columnsConfig,
  onFundClick,
  isOtherUserProfile,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColumn = columns[activeIndex];

  const handleNextColumn = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % columns.length);
  };

  const getColor = (fund) => {
    switch (activeColumn.label) {
      case "Current (Invested)":
        return getChangeColor(fund.invested, fund.current);
      case "Returns (%)":
        return getChangeColor(fund.pnl);
      case "Day change (%)":
        return getChangeColor(fund.dayChangeValue);
      default:
        return "text-foreground";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 text-xs font-semibold">
        <SortByButton
          className="font-semibold sm:rounded-xl sm:p-2 sm:text-sm"
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
          className="border-muted-foreground flex h-auto items-center justify-end gap-1 rounded-xl !px-0 text-right text-xs font-semibold sm:h-10 sm:!p-2 sm:text-sm"
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
            <TableRow
              key={fund.schemeCode}
              onClick={() => onFundClick(fund)}
              className="cursor-pointer"
            >
              <TableCell className="flex items-center gap-4 py-4 pl-4">
                <FundLogo noFormat fundHouseDomain={fund.fundHouseDomain} />

                <div>
                  <h4 className="sm:text-md font-medium text-wrap">
                    {fund.fundShortName}
                  </h4>
                  <span className="text-muted-foreground mt-1 flex items-center text-xs font-medium">
                    {!!fund?.sips?.length && "SIP"}
                  </span>
                </div>
              </TableCell>

              <TableCell onClick={handleNextColumn} className="w-[25%] pr-4">
                <span
                  className={`flex justify-end font-medium sm:text-base ${getColor(fund)}`}
                >
                  {formatToINR(fund[activeColumn.data1], 2)}
                </span>

                <p className="text-muted-foreground flex justify-end text-xs sm:text-sm">
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

export default PortfolioTable;
