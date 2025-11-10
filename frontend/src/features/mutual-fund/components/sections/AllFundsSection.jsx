import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  selectActiveColumn,
  selectFilters,
  setActiveColumn,
} from "@/store/slices/mutualFundSlice";
import { ChevronRightIcon, ChevronsLeftRightIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useGetFilteredFunds } from "../../hooks/useGetFilteredFunds";
import { columnsConfig, getNextColumn } from "../../utils/similarFundsTable";
import FilterBtns from "../filters/FilterBtns";
import SectionHeading from "../SectionHeading";
import TableSM from "../tables/TableSM";

function AllFundsSection() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const activeColumn = useSelector(selectActiveColumn);
  const isMobile = useIsMobile();

  const { data, isPending } = useGetFilteredFunds(filters);
  const funds = data?.pages[0].funds.slice(0, 7) || [];
  const totalCount = data?.pages[0].totalCount;

  // Mobile table callbacks
  const handleColumnClick = () => {
    dispatch(setActiveColumn(getNextColumn(activeColumn)));
  };

  if (!isMobile) return null;

  return (
    <section>
      <div className="bg-background sticky top-0 z-10">
        <SectionHeading heading="All Mutual Funds" />
        <FilterBtns />

        <div className="flex items-center justify-between px-4 py-2 sm:hidden">
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

      <TableSM
        funds={funds}
        isPending={isPending}
        activeColumn={activeColumn}
        onColumnClick={handleColumnClick}
        columnsConfig={columnsConfig}
      />
      <Link
        to="/mutual-funds/all-funds"
        className="flex items-center justify-between gap-1 border-y px-4 py-4 text-sm font-medium"
      >
        <span>View all</span>
        <ChevronRightIcon size={20} />
      </Link>
    </section>
  );
}

export default AllFundsSection;
