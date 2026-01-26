import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import {
  ArrowDownAZIcon,
  ArrowUpZAIcon,
  ChartNoAxesColumnDecreasingIcon,
  ChartNoAxesColumnIncreasing,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { useState } from "react";

function SortByButton({
  defaultSortBy,
  variant = "ghost",
  onSortChange,
  sortOptions,
  activeSortBy,
  className,
}) {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showMore, setShowMore] = useState(!isMobile);

  const handleSortChange = (value) => {
    onSortChange(value);
    setIsDrawerOpen(false);
  };

  const isDefaultSort = activeSortBy === defaultSortBy;

  return (
    <Drawer
      direction={isMobile ? "bottom" : "left"}
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <DrawerTrigger asChild>
        <Button
          variant={variant}
          className={cn(
            "h-7.5 rounded-full sm:h-8",
            variant === "outline" ? "border text-[0.65rem]" : "px-0 text-xs",
            !isDefaultSort && "bg-accent border-foreground border font-[550]",
            className,
          )}
        >
          <div
            className={cn(
              "flex gap-1",
              isDefaultSort &&
                variant !== "outline" &&
                "border-muted-foreground border-b border-dashed",
            )}
          >
            {activeSortBy === "expense_ratio" ? (
              <ChartNoAxesColumnIncreasing className="rotate-90" />
            ) : (
              <ChartNoAxesColumnDecreasingIcon className="rotate-90" />
            )}
            <span>
              {!isDefaultSort
                ? `Sort: ${sortOptions[activeSortBy]}`
                : "Sort by"}
            </span>
          </div>
          {(!isDefaultSort || variant === "outline") && <ChevronDownIcon />}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-auto px-4 pb-2 sm:pt-12">
        <div className="my-2 flex items-center justify-between sm:px-4">
          <DialogTitle className="text-base sm:text-xl">Sort by</DialogTitle>
          <div className="flex items-center">
            <Button
              Clear
              variant="ghost"
              size="icon"
              disabled={isDefaultSort}
              className="text-primary ml-2 disabled:hidden"
              onClick={() => handleSortChange(defaultSortBy)}
            >
              Clear
            </Button>
          </div>
        </div>

        <RadioGroup
          defaultValue={activeSortBy}
          onValueChange={handleSortChange}
          className="gap-0"
        >
          {Object.keys(sortOptions)
            .slice(0, showMore ? undefined : 6)
            .map((option) => (
              <Label
                key={option}
                className="flex cursor-pointer items-center gap-4 border-b px-2 py-4 font-[450] transition-colors sm:ml-2 sm:gap-6 sm:text-base sm:font-medium"
              >
                <RadioGroupItem
                  value={option}
                  id={option}
                  className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2 [&_[data-slot=radio-group-indicator]_svg]:size-2.5"
                />
                <span>{sortOptions[option]}</span>
              </Label>
            ))}
          {Object.keys(sortOptions).length > 6 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMore(!showMore)}
              className="mt-2 w-full text-xs"
            >
              {showMore ? (
                <span className="flex items-center gap-2">
                  Show Less <ChevronUpIcon />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  More options <ChevronDownIcon />
                </span>
              )}
            </Button>
          )}
        </RadioGroup>
      </DrawerContent>
    </Drawer>
  );
}

export default SortByButton;
