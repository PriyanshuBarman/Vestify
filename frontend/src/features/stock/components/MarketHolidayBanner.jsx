import { formatDate } from "date-fns";
import { BellIcon } from "lucide-react";

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { nseHolidays } from "@/constants/holidays";

function MarketHolidayBanner() {
  const today = formatDate(new Date(), "yyyy-MM-dd");
  const todayHoliday = nseHolidays.find((holiday) => holiday.date === today);

  if (!todayHoliday) return null;

  return (
    <Item variant="outline" className="mb-6 mx-4 rounded-2xl">
      <ItemMedia variant="">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          Market Closed Because of &quot;{todayHoliday.description}&quot;
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
export default MarketHolidayBanner;
