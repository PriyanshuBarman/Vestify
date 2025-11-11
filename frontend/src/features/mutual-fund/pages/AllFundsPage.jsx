import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  selectActiveColumn,
  selectFilters,
  setActiveColumn,
  setFilters,
} from "@/store/slices/mutualFundSlice";
import { ChevronsLeftRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import FilterBtns from "../components/filters/FilterBtns";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import { DEFAULT_COLUMNS } from "../constants/collection";
import { useGetFilteredFunds } from "../hooks/useGetFilteredFunds";
import {
  columnsConfig,
  getNewOrder,
  getNextColumn,
} from "../utils/collectionsUtils";

function AllFundsPage() {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);
  const activeColumn = useSelector(selectActiveColumn);
  const filters = useSelector(selectFilters);
  const orderBy = filters.order_by;

  // Pagination
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  } = useGetFilteredFunds(filters);

  const totalCount = data?.pages[0].totalCount;
  const funds = data?.pages.flatMap((page) => page.funds) || []; // automatically adds next page funds to the array

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  // Desktop table callback
  const handleDesktopClick = (clicked) => {
    const newOrder = getNewOrder(clicked, activeColumn, orderBy);
    dispatch(setActiveColumn(clicked));
    dispatch(setFilters({ ...filters, sort_by: clicked, order_by: newOrder }));
  };

  // Mobile table callbacks
  const handleColumnClick = () => {
    dispatch(setActiveColumn(getNextColumn(activeColumn)));
  };

  return (
    <section>
      <div className="bg-background sticky top-0 z-10 w-full">
        <GoBackBar title="All Mutual Funds" />
        <FilterBtns />

        <div className="flex w-full items-center justify-between px-4 py-2 sm:hidden">
          <span className="text-xs font-semibold tabular-nums">
            {totalCount?.toLocaleString()} funds
          </span>
          <Button
            variant="ghost"
            onClick={handleColumnClick}
            className="border-muted-foreground flex h-auto items-center justify-end gap-1 rounded-xl !px-0 text-right text-xs font-semibold"
          >
            <ChevronsLeftRightIcon className="size-4 shrink-0" />
            <span className="border-muted-foreground border-b border-dashed">
              {
                columnsConfig[
                  activeColumn === "popularity" ? "return_3y" : activeColumn
                ].name
              }
            </span>
          </Button>
        </div>
      </div>

      {isMobile ? (
        <TableSM
          funds={funds}
          isPending={isPending}
          activeColumn={activeColumn}
          onColumnClick={handleColumnClick}
          columnsConfig={columnsConfig}
          // Pagination props
          enablePagination={true}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetching={isFetching}
          inViewRef={inViewRef}
        />
      ) : (
        <TableLG
          funds={funds}
          isPending={isPending}
          totalCount={totalCount}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          activeColumn={activeColumn}
          sortOrder={orderBy}
          onClick={handleDesktopClick}
          columnsConfig={columnsConfig}
          // Pagination props
          enablePagination={true}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetching={isFetching}
          inViewRef={inViewRef}
        />
      )}
    </section>
  );
}

export default AllFundsPage;
