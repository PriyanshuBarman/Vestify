import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters, setFilters } from "@/store/slices/mutualFundSlice";
import { setActiveColumn } from "@/store/slices/mutualFundSlice";

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity" },
  { label: "1Y Returns", value: "return_1y" },
  { label: "3Y Returns", value: "return_3y" },
  { label: "5Y Returns", value: "return_5y" },
  { label: "Rating", value: "fund_rating" },
  { label: "Fund Size", value: "aum" },
  { label: "Expense Ratio", value: "expense_ratio" },
];

function FilterSortByTab() {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const handleSortChange = (value) => {
    dispatch(
      setFilters({
        ...filters,
        sort_by: value,
        order_by: value === "expense_ratio" ? "asc" : "desc",
      }),
    );
    if (value !== "popularity") dispatch(setActiveColumn(value));
  };

  return (
    <RadioGroup
      value={filters.sort_by}
      onValueChange={handleSortChange}
      className="gap-0"
    >
      {SORT_OPTIONS.map((option) => (
        <div
          key={option.value}
          className="flex cursor-pointer items-center space-x-3 border-b px-2 py-4 sm:py-6"
          onClick={() => handleSortChange(option.value)}
        >
          <RadioGroupItem
            value={option.value}
            id={option.value}
            className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2 [&_[data-slot=radio-group-indicator]_svg]:size-2.5"
          />
          <Label htmlFor={option.value} className="h-full font-normal">
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default FilterSortByTab;
