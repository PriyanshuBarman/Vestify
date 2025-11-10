import LoadingState from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FundRating from "@/features/mutual-fund/components/FundRating";
import { formatToINR } from "@/utils/formatters";
import { ChevronDownIcon } from "lucide-react";
import { Link } from "react-router";
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
                  onClick={() => onClick(key)}
                  className={`flex items-center justify-center gap-2 ${
                    activeColumn === key &&
                    "after:bg-primary after:absolute after:bottom-0 after:h-1 after:w-full after:rounded-t-xl after:content-['']"
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
            <TableRow key={fund.scheme_code}>
              <TableCell className="flex items-center gap-8 py-4 pl-8">
                <FundLogo fundHouseDomain={fund.detail_info} />
                <div>
                  <Link to={`/mutual-funds/${fund.scheme_code}`}>
                    <h4 className="text-base text-wrap">{fund.short_name}</h4>
                  </Link>
                  <p className="text-muted-foreground mt-1 flex gap-2 text-xs">
                    <span>{fund.fund_type}</span>
                    <span>
                      {fund.fund_category === "Fund of Funds"
                        ? fund.fund_category
                        : fund.fund_category.replace(/\bFund\b/, "")}
                    </span>
                    <FundRating
                      rating={fund.fund_rating}
                      className="text-sm leading-none"
                    />
                  </p>
                </div>
              </TableCell>

              {visibleColumns.map((key) => (
                <TableCell
                  onClick={() => onClick(key)}
                  key={key}
                  className={` ${activeColumn === key && "font-semibold"} text-md text-center`}
                >
                  {key === "aum"
                    ? fund[key]
                      ? `${formatToINR(fund[key] / 10, 1)}Cr`
                      : "-"
                    : fund[key]
                      ? `${columnsConfig[key].prefix || ""} ${fund[key]}${columnsConfig[key].suffix || ""}`
                      : "-"}
                </TableCell>
              ))}

              {/* this table cell is for add more btn */}
              <TableCell />
            </TableRow>
          ))}

          {/* =============== Loading States =============== */}
          {/* First Request Loading State */}
          {isPending && (
            <TableRow className="border-none">
              <TableCell colSpan={visibleColumns.length + 2} className="p-0">
                <LoadingState fullPage className="h-[calc(100vh-200px)]" />
              </TableCell>
            </TableRow>
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
