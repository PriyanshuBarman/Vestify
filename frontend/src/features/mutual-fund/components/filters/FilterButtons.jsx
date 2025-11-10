import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  resetFilters,
  selectFilters,
  setActiveColumn,
  setFilters,
} from "@/store/slices/mutualFundSlice";
import { XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { columnsConfig } from "../../utils/collectionsHelper";
import { getActiveFilterCount } from "../../utils/filterUtils";
import SortByButton from "./SortByButton";
import ActiveFilterButtons from "./ActiveFilterButtons";
import OpenFilterSheetBtn from "./OpenFilterSheetBtn";

const sortOptions = {
  popularity: "Popular",
  return_1y: "1Y Returns",
  return_3y: "3Y Returns",
  return_5y: "5Y Returns",
  fund_rating: "Rating",
  expense_ratio: "Expense Ratio",
  aum: "Fund Size",
  lump_min: "Min Lumpsum",
  sip_min: "Min SIP",
};

const FUND_CATEGORIES = ["Flexi Cap Fund", "Small Cap Fund"];

function FilterButtons() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const activeFilterCount = getActiveFilterCount(filters);
  const orderBy = filters.order_by;
  let activeSortBy = filters.sort_by;

  // callbacks for SortByBtn
  const handleSortChange = (columnKey) => {
    const orderBy = columnKey === "expense_ratio" ? "asc" : "desc";
    dispatch(setFilters({ ...filters, sort_by: columnKey, order_by: orderBy }));
    if (columnKey !== "popularity") dispatch(setActiveColumn(columnKey));
    activeSortBy = columnKey;
  };

  const handleOrderChange = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc";
    dispatch(setFilters({ ...filters, order_by: newOrder }));
  };
  // ------------------------------------------------------------

  // Toggle FundCategory selection
  const isSelected = (value) => filters.fund_category.includes(value);

  const handleToggle = (FundCategory) => {
    if (isSelected(FundCategory)) {
      dispatch(
        setFilters({
          ...filters,
          fund_category: filters.fund_category.filter(
            (fc) => fc !== FundCategory,
          ),
        }),
      );
    } else {
      dispatch(
        setFilters({
          ...filters,
          fund_category: [...filters.fund_category, FundCategory],
        }),
      );
    }
  };

  return (
    <div className="swiper-no-swiping scrollbar-none flex items-center gap-2 overflow-auto overflow-x-auto px-4 py-2 sm:pb-8">
      <OpenFilterSheetBtn />

      <Separator
        orientation="vertical"
        className="mx-1 data-[orientation=vertical]:h-8"
      />
      <SortByButton
        order={orderBy}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
        sortOptions={sortOptions}
        columnsConfig={columnsConfig}
        activeSortBy={activeSortBy}
      />
      <ActiveFilterButtons />

      <Label
        className={`flex w-fit shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[0.65rem] sm:h-10 sm:text-xs ${
          isSelected("Index Funds")
            ? "border-foreground bg-accent"
            : "border-border"
        }`}
      >
        <span>Index only</span>
        <Switch
          id="index-only"
          checked={isSelected("Index Funds")}
          onCheckedChange={() => handleToggle("Index Funds")}
          className="data-[state=checked]:bg-foreground"
        />
      </Label>

      {FUND_CATEGORIES.map((FundCategory) => (
        <Button
          key={FundCategory}
          variant="outline"
          className={`h-7.5 rounded-full text-[0.65rem] sm:h-10 sm:text-xs ${isSelected(FundCategory) ? "!border-foreground !bg-accent" : ""}`}
          onClick={() => handleToggle(FundCategory)}
        >
          <span>{FundCategory.replace(/\bFund\b/, "")}</span>
          {isSelected(FundCategory) && (
            <XIcon className="text-foreground ml-1 size-3.5" />
          )}
        </Button>
      ))}

      <Button
        onClick={() => dispatch(resetFilters())}
        variant="outline"
        className="text-primary disabled:text-foreground h-7.5 rounded-full border-none !bg-transparent text-xs shadow-none sm:h-10"
        disabled={activeFilterCount === 0}
      >
        <span
          className={`${activeFilterCount === 0 && "border-foreground border-b border-dashed"}`}
        >
          Clear all
        </span>
      </Button>
    </div>
  );
}
export default FilterButtons;
