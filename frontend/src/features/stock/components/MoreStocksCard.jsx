import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

import { Card, CardDescription, CardFooter } from "@/components/ui/card";
import StockLogo from "@/components/StockLogo";

function MoreStocksCard({ stocks, moreLink }) {
  return (
    <Link to={moreLink}>
      <Card className="h-44 sm:h-48 cursor-pointer justify-between gap-2 rounded-3xl p-4 duration-200 hover:scale-101">
        <div className="flex flex-wrap w-4/5 gap-2">
          {stocks.map(({ symbol }, index) => (
            <StockLogo key={index} symbol={symbol} className="border" />
          ))}
        </div>
        <CardFooter className="px-0">
          <CardDescription className="gap-2 flex items-center font-medium">
            See more <ChevronRightIcon className="size-4" />
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
export default MoreStocksCard;
