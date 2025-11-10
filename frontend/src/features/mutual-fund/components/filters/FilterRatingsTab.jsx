import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters, setFilters } from "@/store/slices/mutualFundSlice";

const ratingOptions = [
  { label: "5 ", value: 5 },
  { label: "4+ ", value: 4 },
  { label: "3+ ", value: 3 },
  { label: "2+ ", value: 2 },
  { label: "1+  ", value: 1 },
];

function FilterRatingsTab() {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const handleRatingChange = (value) => {
    dispatch(setFilters({ ...filters, fund_rating_gte: value }));
  };

  return (
    <div className="h-full">
      <RadioGroup
        value={Number(filters.fund_rating_gte)}
        onValueChange={handleRatingChange}
        className="gap-0"
      >
        {ratingOptions.map((option) => (
          <div
            key={option.value}
            className="flex cursor-pointer items-center space-x-3 border-b p-2 py-4 font-normal"
            onClick={() => handleRatingChange(option.value)}
          >
            <RadioGroupItem
              value={option.value}
              id={`rating-${option.value}`}
              className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2 [&_[data-slot=radio-group-indicator]_svg]:size-2.5"
            />
            <Label htmlFor={`rating-${option.value}`}>
              <span className="whitespace-pre">{option.label}</span>
              <StarIcon className="fill-foreground size-3" />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterRatingsTab;
