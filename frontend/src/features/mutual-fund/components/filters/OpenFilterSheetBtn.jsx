import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollLock } from "@/hooks/useScrollLock";
import { selectFilters } from "@/store/slices/mutualFundSlice";
import { SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getActiveFilterCount } from "../../utils/filterUtils";
import FilterSheetContent from "./FilterSheetContent";

const OpenFilterSheetBtn = () => {
  const isMobile = useIsMobile();
  const filters = useSelector(selectFilters);
  const activeFilterCount = getActiveFilterCount(filters);
  const [isOpen, setIsOpen] = useState(false);

  useScrollLock(isOpen);

  return (
    <Sheet open={isOpen} modal={!isMobile} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative size-8 rounded-full sm:size-10"
          aria-label="Open filters"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <SlidersHorizontalIcon className="size-3.5 sm:size-4" />
          {activeFilterCount > 0 && (
            <Badge className="bg-foreground text-background absolute -top-2 -right-2 flex h-5 min-w-5 rounded-full p-0 font-mono tabular-nums">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        className={`[&>button]:hidden ${isMobile ? "fixed inset-0" : "min-w-sm overflow-hidden data-[state=open]:duration-300"}`}
      >
        <SheetTitle className="sr-only">Filter Sheet</SheetTitle>
        <FilterSheetContent onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default OpenFilterSheetBtn;
