import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";
import { formatFundCategory } from "../../utils/formaters";
import { getColumnValueSm } from "../../utils/tableUtils";
import FundLogo from "../FundLogo";

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
  return (
    <ScrollArea className="overflow-x-auto">
      <Table className="table-fixed">
        <TableBody>
          {funds?.map((fund) => (
            <TableRowFund
              key={fund.scheme_code}
              fund={fund}
              activeColumn={activeColumn}
              columnsConfig={columnsConfig}
              onColumnClick={onColumnClick}
            />
          ))}

          {/* Initial Loading Skeleton  */}
          {isPending && <TableRowSkeleton count={10} />}

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

function TableRowFund({ fund, activeColumn, columnsConfig, onColumnClick }) {
  return (
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
            {!!fund.fund_rating && <span>{fund.fund_rating} ★</span>}
          </p>
        </div>
      </TableCell>

      <TableCell
        className="w-[25%] pr-4 text-right font-[450]"
        onClick={onColumnClick}
      >
        {getColumnValueSm(fund, activeColumn, columnsConfig)}
      </TableCell>
    </TableRow>
  );
}

function TableRowSkeleton({ count = 10 }) {
  return Array.from({ length: count }).map((_, index) => (
    <TableRow key={index}>
      <TableCell className="flex items-center gap-4 py-4 pl-4">
        <Skeleton className="size-8" />
        <div>
          <Skeleton className="h-3 w-46" />
          <Skeleton className="mt-3 h-3 w-28" />
        </div>
      </TableCell>

      <TableCell className="w-[25%] pr-4">
        <Skeleton className="ml-auto h-3 w-1/2" />
      </TableCell>
    </TableRow>
  ));
}
