import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { useGetCategories } from "../hooks/useGetCategories";
import { selectFilters } from "@/store/slices/mutualFundSlice";

const CustomCheckbox = ({ onChange, className, id, fundType, ...props }) => {
  const filters = useSelector(selectFilters);
  const { data: categories = [] } = useGetCategories();

  // Format categories as object for efficient access
  const data = categories.reduce((acc, item) => {
    acc[item.fund_type] = item.fund_categories.split(",").map((s) => s.trim());
    return acc;
  }, {});

  const selectedFundCategories = filters.fund_category || [];

  const getCategorySelectionState = (fundType) => {
    const selectedFCsOfFundTypeCount = data[fundType]?.filter((fc) =>
      selectedFundCategories.includes(fc),
    ).length;

    if (selectedFCsOfFundTypeCount === data[fundType]?.length) {
      return "checked";
    } else if (selectedFCsOfFundTypeCount > 0) {
      return "indeterminate";
    } else {
      return "unchecked";
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onChange();
  };

  const isChecked = getCategorySelectionState(fundType) === "checked";
  const isIndeterminate =
    getCategorySelectionState(fundType) === "indeterminate";

  return (
    <button
      role="checkbox"
      aria-checked={isChecked ? "true" : isIndeterminate ? "mixed" : "false"}
      tabIndex={0}
      className={cn(
        "focus:ring-primary border-primary flex size-4.5 cursor-pointer items-center justify-center rounded border-2 transition-colors",
        isChecked
          ? "bg-primary"
          : isIndeterminate
            ? "bg-primary"
            : "border-muted-foreground",
        className,
      )}
      onClick={handleClick}
      id={id}
      {...props}
    >
      {isChecked && <Check className="text-background" />}
      {isIndeterminate && <Minus className="text-background" />}
    </button>
  );
};

export default CustomCheckbox;
