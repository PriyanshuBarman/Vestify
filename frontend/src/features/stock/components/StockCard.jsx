import { Link } from "react-router";

import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveStockField } from "../hooks/useGetLiveStockField";
import StockLogo from "./StockLogo";

function StockCard({ symbol, name }) {
  const live = useGetLiveStockField(symbol);

  return (
    <Link to={`/stocks/${symbol}`}>
      <Card className="h-44 w-43 sm:size-48 cursor-pointer justify-between gap-2 rounded-3xl p-4 duration-200 hover:scale-101">
        <StockLogo symbol={symbol} />
        <CardTitle className="line-clamp-2 text-sm leading-tight font-medium sm:text-[0.9rem] sm:font-[450]">
          {name}
        </CardTitle>

        <CardFooter className="flex-col gap-2 font-medium px-0 items-start">
          <span className="text-md">{formatToINR(live.price, 2, 2)}</span>

          {live.change == undefined ? (
            <Skeleton className="h-3  w-full" />
          ) : (
            <CardDescription
              className={`${live.change >= 0 ? "text-positive" : "text-negative"}`}
            >
              {live.change?.toFixed(2)} ({live.changePercent?.toFixed(2) + "%"})
            </CardDescription>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
export default StockCard;
