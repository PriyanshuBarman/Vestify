import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters, setFilters } from "@/store/slices/mutualFundSlice";

const RISK_LEVELS = [
  "Low Risk",
  "Low to Moderate Risk",
  "Moderate Risk",
  "Moderately High Risk",
  "High Risk",
  "Very High Risk",
];

function FilterRiskLevelTab() {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const selected = filters?.crisil_rating;

  const handleChange = (risk) => {
    if (selected.includes(risk)) {
      dispatch(
        setFilters({
          ...filters,
          crisil_rating: selected.filter((r) => r !== risk),
        }),
      );
    } else {
      dispatch(
        setFilters({
          ...filters,
          crisil_rating: [...selected, risk],
        }),
      );
    }
  };

  return (
    <div className="h-full">
      {RISK_LEVELS.map((risk) => (
        <Label
          key={risk}
          className="flex items-center space-x-2 border-b p-2 py-4 font-normal sm:py-6"
        >
          <Checkbox
            checked={selected.includes(risk)}
            id={risk}
            onCheckedChange={() => handleChange(risk)}
            className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2"
          />
          <span>{risk}</span>
        </Label>
      ))}
    </div>
  );
}

export default FilterRiskLevelTab;
