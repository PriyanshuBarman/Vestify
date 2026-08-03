import { ParasolIcon } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { isStockHolidayToday } from "@/utils/holidays";

function MarketHolidayBanner() {
  const todayHoliday = isStockHolidayToday();

  if (!todayHoliday) return null;

  return (
    <Item variant="outline" className="mx-4 mb-4 rounded-[1.25rem]">
      <ItemMedia variant="icon" className="size-10.5 rounded-lg">
        <ParasolIcon className="size-6" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="leading-none">
          Today is a market holiday
        </ItemTitle>
        <ItemDescription>{todayHoliday.description}</ItemDescription>
      </ItemContent>
    </Item>
  );
}

export default MarketHolidayBanner;
