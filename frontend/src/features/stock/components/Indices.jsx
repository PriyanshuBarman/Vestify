import { useSelector } from "react-redux";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

import { indices } from "../constants/indices";
import { useGetIndices } from "../hooks/useGetIndices";
import { useGetLiveData } from "../hooks/useGetLiveData";
import { useSubscribeStock } from "../hooks/useSubscribeStock";

const INDICES_SYMBOLS = indices.map((item) => item.symbol);

function Indices() {
  const { data: indicesData } = useGetIndices();
  useSubscribeStock(INDICES_SYMBOLS);

  return (
    <div className="py-4 px-4 sm:px-0 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto scrollbar-none">
      {indices.map((item) => (
        <IndexItem
          key={item.symbol}
          symbol={item.symbol}
          name={item.name}
          initialData={indicesData?.[item.symbol]}
        />
      ))}
    </div>
  );
}

export default Indices;

function IndexItem({ symbol, name, initialData }) {
  const isMarketOpen = useSelector((state) => state.stock.isMarketOpen);
  const live = useGetLiveData(symbol, { fallback: initialData });

  const price = live.price || initialData?.regularMarketPrice;
  const change = live.change ?? initialData?.regularMarketChange ?? 0;
  const changePercent =
    live.changePercent ?? initialData?.regularMarketChangePercent ?? 0;

  const isPositive = change >= 0;

  return (
    <Item
      variant="outline"
      className="flex-1 min-w-46 sm:min-w-[11rem] p-3 rounded-xl"
    >
      <ItemContent>
        <ItemTitle className="text-xs">
          <span>{name}</span>
          {isMarketOpen && (
            <span className="text-2xs sm:text-xs text-primary py-0">Live</span>
          )}
        </ItemTitle>
        {live.isPending ? (
          <Skeleton className="w-2/3 h-4" />
        ) : (
          <ItemDescription className="text-xs space-x-1 tabular-nums text-nowrap font-[450] sm:font-medium">
            <span>{price ? Number(price).toLocaleString("en-IN") : "--"}</span>
            <span className={isPositive ? "text-positive" : "text-negative"}>
              {isPositive ? "+" : ""}
              {Number(change).toFixed(2)} ({Number(changePercent).toFixed(2)}%)
            </span>
          </ItemDescription>
        )}
      </ItemContent>
    </Item>
  );
}
