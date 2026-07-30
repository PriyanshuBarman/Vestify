import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BSE_INDICES } from "../../constants/bseIndices";

function FilterIndices({
  value,
  onChange,
  indices = BSE_INDICES,
  placeholder = "Select Index",
  className = "",
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        icon={<ChevronsUpDownIcon className="size-3.5 text-foreground" />}
        className={cn(
          "rounded-full h-9 font-medium tabular-nums sm:text-sm border-foreground bg-accent  text-2xs px-3 sm:px-4 shadow-none ",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="rounded-xl min-w-[10rem]">
        {indices.map((indexItem) => (
          <SelectItem
            key={indexItem.value}
            value={indexItem.value}
            className="rounded-lg text-xs sm:text-sm"
          >
            {indexItem.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FilterIndices;
