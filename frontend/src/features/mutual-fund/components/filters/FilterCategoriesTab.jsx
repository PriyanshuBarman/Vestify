import { useGetCategories } from "../../hooks/useGetCategories";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "@/store/slices/mutualFundSlice";
import { setFilters } from "@/store/slices/mutualFundSlice";
import CustomCheckbox from "../CustomCheckbox";
import { formatFundCategory } from "../../utils/formaters";
import { Switch } from "@/components/ui/switch";
import LoadingState from "@/components/LoadingState";

function FilterCategoriesTab() {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  const { data: categories = [], isLoading } = useGetCategories();

  // Format categories as object for efficient access
  const data = categories.reduce((acc, item) => {
    acc[item.fund_type] = item.fund_categories.split(",").map((s) => s.trim());
    return acc;
  }, {});

  const selectedFundCategories = filters.fund_category || [];

  const handleFundTypeClick = (fundType) => {
    const selectedFCsOfFundTypeCount = data[fundType].filter((fc) =>
      selectedFundCategories.includes(fc),
    ).length;

    // if all fund_category of this fundType are selected then remove all fund_category of this fundType else add all the fund_category of this fundType to filters only which are not already selected
    if (selectedFCsOfFundTypeCount === data[fundType].length) {
      dispatch(
        setFilters({
          ...filters,
          fund_category: selectedFundCategories.filter(
            (fc) => !data[fundType].includes(fc),
          ),
        }),
      );
    } else {
      dispatch(
        setFilters({
          ...filters,
          fund_category: [
            ...selectedFundCategories,
            ...data[fundType].filter(
              (fc) => !selectedFundCategories.includes(fc),
            ),
          ],
        }),
      );
    }
  };

  const handleFundCategoryChange = (fundCategory) => {
    // If fundCategory is already selected then just remove it from filters else add it to filters
    if (selectedFundCategories.includes(fundCategory)) {
      dispatch(
        setFilters({
          ...filters,
          fund_category: selectedFundCategories.filter(
            (fc) => fc !== fundCategory,
          ),
        }),
      );
    } else {
      dispatch(
        setFilters({
          ...filters,
          fund_category: [...selectedFundCategories, fundCategory],
        }),
      );
    }
  };

  //Returns the count of selected fund_category for a given fund type.
  const getSelectedFCsCount = (fundType) =>
    data[fundType].filter((fc) => selectedFundCategories.includes(fc)).length;

  if (isLoading) {
    return <LoadingState isLoading={isLoading} className="mt-4" />;
  }

  return (
    <div className="h-full overflow-y-auto">
      <Label
        className={`text-foreground flex cursor-pointer items-center justify-between gap-2 rounded-2xl border px-4 py-4 ${
          selectedFundCategories.includes("Index Funds")
            ? "border-foreground bg-accent"
            : "border-border"
        }`}
      >
        <span>Index Funds</span>
        <Switch
          id="index-only"
          checked={selectedFundCategories.includes("Index Funds")}
          onCheckedChange={() => handleFundCategoryChange("Index Funds")}
          className="data-[state=checked]:bg-foreground h-5.5 w-10 [&_[data-slot=switch-thumb]]:size-4.5 [&_[data-slot=switch-thumb]]:data-[state=checked]:translate-x-full"
        />
      </Label>

      <Accordion type="multiple">
        {Object.entries(data).map(([fundType, fundCategories]) => {
          return (
            <AccordionItem key={fundType} value={fundType}>
              <AccordionTrigger className="py-6">
                <div className="flex w-full items-center space-x-3">
                  <CustomCheckbox
                    onChange={() => handleFundTypeClick(fundType)}
                    fundType={fundType}
                    id={`main-${fundType}`}
                  />
                  <Label
                    htmlFor={`main-${fundType}`}
                    className="cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-foreground">{fundType}</span>
                    <span className="text-muted-foreground ml-1.5 font-normal">
                      {getSelectedFCsCount(fundType)}/{data[fundType].length}
                    </span>
                  </Label>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-4">
                {fundCategories.map((fundCategory) => (
                  <Label
                    key={fundCategory}
                    className="flex items-center space-x-4 border-b py-4 font-normal"
                  >
                    <Checkbox
                      checked={filters.fund_category?.includes(fundCategory)}
                      onCheckedChange={() =>
                        handleFundCategoryChange(fundCategory)``
                      }
                      id={fundCategory}
                      className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2"
                    />

                    <span className="text-sm">
                      {formatFundCategory(fundCategory)}
                    </span>
                  </Label>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default FilterCategoriesTab;
