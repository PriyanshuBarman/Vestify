import { ChevronsLeftRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

function TableSMHeader({
  totalCount = 0,
  activeColumnLabel,
  onColumnClick,
  unit = "stocks",
}) {
  return (
    <div className="flex w-full items-center justify-between px-4 py-2 sm:hidden">
      <span className="text-xs text-muted-foreground font-semibold tabular-nums">
        Showing {totalCount?.toLocaleString()} {unit}
      </span>
      <Button
        variant="ghost"
        onClick={onColumnClick}
        className="border-muted-foreground flex h-auto items-center justify-end gap-1 rounded-xl !px-0 text-right text-xs font-semibold"
      >
        <ChevronsLeftRightIcon className="size-4 shrink-0" />
        <span className="border-muted-foreground border-b border-dashed">
          {activeColumnLabel}
        </span>
      </Button>
    </div>
  );
}

export default TableSMHeader;
