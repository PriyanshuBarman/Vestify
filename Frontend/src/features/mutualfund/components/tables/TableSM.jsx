import LoadingState from "@/components/LoadingState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import FundRating from "@/features/mutualfund/components/FundRating";
import { Loader2, StarIcon } from "lucide-react";
import { Link } from "react-router";
import { formatFundCategory, formatToINR } from "../../utils/formaters";
import FundLogo from "../FundLogo";
import { cn } from "@/lib/utils";

/**
 *  Reusable Small screen table with pagination support
 */

function TableSM({
  funds,
  isPending, // Becomes true only when the first request is loading
  activeColumn,
  onColumnClick,
  columnsConfig,
  // Pagination props
  enablePagination = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  isFetching = false,
  inViewRef = null,
}) {
  const getValue = (fund) => {
    if (activeColumn === "popularity") {
      return fund["return_3y"] ? `${fund["return_3y"]}%` : "NA";
    }
    if (activeColumn === "aum") {
      return fund[activeColumn]
        ? `${formatToINR(fund[activeColumn] / 10, 0)} Cr`
        : "NA";
    }
    return fund[activeColumn]
      ? `${columnsConfig[activeColumn].prefix || ""}${fund[activeColumn]} ${columnsConfig[activeColumn].suffix || ""}`
      : "NA";
  };

  return (
    <ScrollArea className="overflow-x-auto">
      <Table className="table-fixed">
        <TableBody>
          {funds?.map((fund) => (
            <TableRow key={fund.scheme_code}>
              <TableCell className="flex items-center gap-4 py-4 pl-4">
                <FundLogo fundHouseDomain={fund.detail_info} />
                <div>
                  <h4 className="Fund-Name text-foreground text-wrap">
                    <Link to={`/mutual-funds/${fund.scheme_code}`}>
                      {fund.short_name}
                    </Link>
                  </h4>

                  <p className="text-muted-foreground mt-1 space-x-1 text-xs text-wrap">
                    <span>{fund.fund_type}</span>
                    <span>{formatFundCategory(fund.fund_category)}</span>
                    {fund.fund_rating ? <span>{fund.fund_rating} ★</span> : ""}
                  </p>
                </div>
              </TableCell>

              <TableCell
                onClick={onColumnClick}
                className="w-[25%] pr-4 text-right font-[450] break-words whitespace-normal"
              >
                {getValue(fund)}
              </TableCell>
            </TableRow>
          ))}

          {/* =============== Loading States =============== */}
          {/* First Request Loading State */}
          {isPending && (
            <TableRow className="border-none">
              <TableCell colSpan={2} className="p-0">
                <LoadingState fullPage className="h-[calc(100vh-200px)]" />
              </TableCell>
            </TableRow>
          )}
          {/* Pagination loader row - only show if pagination is enabled */}
          {enablePagination && (
            <TableRow>
              <TableCell colSpan={2} className="p-0">
                <div
                  ref={inViewRef}
                  className="flex h-16 w-full items-center justify-center"
                >
                  {isFetchingNextPage && hasNextPage && (
                    <Loader2 className="animate-spin" />
                  )}
                  {!hasNextPage && !isFetching && (
                    <p className="text-muted-foreground text-xs opacity-50">
                      No more funds
                    </p>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default TableSM;
