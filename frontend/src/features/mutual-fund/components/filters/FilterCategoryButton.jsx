import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function FilterCategoryButton({
  isPending,
  categories,
  activeCategory,
  onCategoryChange,
}) {
  const showLoading = isPending || !categories?.length;

  return (
    <ScrollArea>
      <div className="flex space-x-2 p-4">
        {(showLoading ? Array(3).fill("•••") : categories).map((ct, i) => (
          <Button
            key={showLoading ? i : ct}
            disabled={showLoading}
            variant="outline"
            className={`h-7.5 rounded-full text-[0.65rem] sm:h-10 sm:text-xs ${
              activeCategory === ct && "!border-foreground bg-accent"
            }`}
            onClick={() => onCategoryChange(ct)}
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
