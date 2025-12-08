import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FundRating from "@/features/mutual-fund/components/FundRating";
import { ChevronDownIcon } from "lucide-react";
import { Link } from "react-router";
import { getColumnValueLg } from "../../utils/tableUtils";
import FundLogo from "../FundLogo";

/**
 *  Reusable Large screen table with pagination support

 */

function TableLG({
  funds,
  isPending, // Becomes true only when the first request is loading
  totalCount,
  visibleColumns,
  setVisibleColumns,
  activeColumn,
  sortOrder,
  onClick,
  columnsConfig,
  // Pagination props
  enablePagination = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  isFetching = false,
  inViewRef = null,
}) {
  return (
    <ScrollArea className="h-dvh overflow-auto rounded-3xl border">
      <Table>
        <TableHeader className="bg-accent sticky top-0 z-10 h-16">
          <TableRow>
            <TableHead className="text-muted-foreground pl-12 tabular-nums">
              Fund Name ( {totalCount?.toLocaleString()} results )
            </TableHead>
            {visibleColumns.map((key) => (
              <TableHead key={key} className="relative">
                <div
                  onClick={() => !isPending && onClick(key)}
                  className={`flex items-center justify-center gap-2 ${
                    activeColumn === key &&
                    "after:bg-primary font-semibold after:absolute after:bottom-0 after:h-1 after:w-full after:rounded-t-xl after:content-['']"
                  }`}
                >
                  <span>{columnsConfig[key].shortName}</span>
                  {activeColumn === key ? (
                    <ChevronDownIcon
                      className={`fill-foreground size-4 transition-all duration-200 ease-in ${sortOrder === "desc" && "rotate-180"} `}
                    />
                  ) : (
                    <ChevronDownIcon className="fill-foreground size-4" />
                  )}
                </div>
              </TableHead>
            ))}

            <TableHead>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs"
                  >
                    Add+
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col">
                    {Object.keys(columnsConfig).map((key) => (
                      <Label
                        key={key}
                        className="hover:bg-accent flex items-center gap-4 rounded-lg py-3 pl-4"
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
                          className="size-5"
                        />
                        {columnsConfig[key].name}
                      </Label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className={`${isFetchingNextPage && "blur-xs"}`}>
          {funds?.map((fund) => (
            <TableRowLG
              key={fund.scheme_code}
              fund={fund}
              visibleColumns={visibleColumns}
              onClick={onClick}
              activeColumn={activeColumn}
              columnsConfig={columnsConfig}
            />
          ))}

          {/* Initial Loading Skeleton  */}
          {isPending && (
            <TableRowSkeleton count={10} visibleColumns={visibleColumns} />
          )}

          {/* Pagination */}
          {enablePagination && (
            <TableRow>
              <TableCell colSpan={visibleColumns.length + 2} className="p-0">
                <div
                  ref={inViewRef}
                  className="flex h-16 w-full items-center justify-center"
                >
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

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default TableLG;

function TableRowLG({
  fund,
  visibleColumns,
  onClick,
  activeColumn,
  columnsConfig,
}) {
  return (
    <TableRow>
      <TableCell className="flex items-center gap-8 py-4 pl-8">
        <FundLogo fundHouseDomain={fund.detail_info} />

        <div>
          <Link to={`/mutual-funds/${fund.scheme_code}`}>
            <h4 className="text-base">{fund.short_name}</h4>
          </Link>

          <p className="text-muted-foreground mt-1 flex gap-2 text-xs">
            <span>{fund.fund_type}</span>
            <span>{fund.fund_category.replace(/\bFund\b/, "")}</span>
            <FundRating rating={fund.fund_rating} />
          </p>
        </div>
      </TableCell>

      {/* Dynamic columns */}
      {visibleColumns.map((key) => (
        <TableCell
          key={key}
          onClick={() => onClick(key)}
          className={`text-md text-center ${
            activeColumn === key && "font-semibold"
          }`}
        >
          {getColumnValueLg(fund, key, columnsConfig)}
        </TableCell>
      ))}

      <TableCell />
    </TableRow>
  );
}

function TableRowSkeleton({ count = 10, visibleColumns }) {
  return Array.from({ length: count }).map((_, index) => (
    <TableRow key={index}>
      <TableCell className="flex items-center gap-8 py-4 pl-8">
        <Skeleton className="size-10" />
        <div>
          <Skeleton className="h-3 w-52" />
          <Skeleton className="mt-3 h-3 w-28" />
        </div>
      </TableCell>

      {visibleColumns.map((key) => (
        <TableCell key={key}>
          <Skeleton className="mx-auto h-3 w-12" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
