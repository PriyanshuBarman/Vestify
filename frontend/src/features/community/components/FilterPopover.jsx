import { FilterIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectSortBy, setSortBy } from "@/store/slices/communitySlice";

function FilterPopover() {
  const sortBy = useSelector(selectSortBy);
  const dispatch = useDispatch();

  return (
    <Select
      value={sortBy}
      onValueChange={(value) => dispatch(setSortBy(value))}
    >
      <SelectTrigger
        size="sm"
        aria-label="Sort"
        className="border-transparent max-sm:!bg-transparent shadow-none [&_[data-slot=select-value]]:sr-only [&_svg:last-child]:hidden"
      >
        <SelectValue placeholder="Sort" />
        <FilterIcon className="text-foreground size-5" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="rounded-xl [&_[data-slot=select-item]]:rounded-lg "
      >
        <SelectItem value="updatedAt">Recently Active</SelectItem>
        <SelectItem value="createdAt">New Users</SelectItem>
        <SelectItem value="balance">Most Balance</SelectItem>
        <SelectItem value="name">A-Z</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default FilterPopover;
