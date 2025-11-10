import { Button } from "@/components/ui/button";
import { useGetCategories } from "../../hooks/useGetCategories";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function FilterCategoryButton({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  const handleSortChange = (value) => {
    onCategoryChange(value);
  };

  return (
    <ScrollArea>
      <div className="flex space-x-2 p-4">
        {categories?.map((ct) => (
          <Button
            key={ct}
            variant="outline"
            className={`h-7.5 rounded-full text-[0.65rem] sm:h-10 sm:text-xs ${
              activeCategory === ct && "!border-foreground bg-accent"
            }`}
            onClick={() => handleSortChange(ct)}
          >
            {ct}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="max-sm:hidden" />
    </ScrollArea>
  );
}

export default FilterCategoryButton;
