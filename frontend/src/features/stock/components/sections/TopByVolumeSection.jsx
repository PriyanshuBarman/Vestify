import { useMemo } from "react";
import { ChevronRightIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import SectionError from "@/components/SectionError";
import StockLogo from "@/components/StockLogo";
import {
  selectActiveTabIndex,
  selectTopByVolumeIndex,
  setTopByVolumeIndex,
} from "@/store/slices/stockSlice";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveData } from "../../hooks/useGetLiveData";
import { useGetTopByVolume } from "../../hooks/useGetTopByVolume";
import { useSubscribeStock } from "../../hooks/useSubscribeStock";
import FilterIndices from "../overlays/FilterIndices";

function TopByVolumeSection() {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const isActive = activeTabIndex === 0;

  const dispatch = useDispatch();
  const selectedIndex = useSelector(selectTopByVolumeIndex);
  const setSelectedIndex = (val) => dispatch(setTopByVolumeIndex(val));

  const {
    data: stocks,
    isFetching,
    error,
    refetch,
  } = useGetTopByVolume(selectedIndex);

  const symbols = useMemo(() => {
    return (
      stocks
        ?.slice(0, 3)
        .map((stock) => stock.symbol)
        .filter(Boolean) || []
    );
  }, [stocks]);

  useSubscribeStock(symbols, { enabled: isActive });

  if (error) {
    return (
      <SectionError
        heading="Top by volume"
        isFetching={isFetching}
        error={error}
        refetch={refetch}
      />
    );
  }

  return (
    <section>
      <div className="mb-4 flex justify-between px-4 sm:mb-4 sm:px-0">
        <div>
          <h2 className="font-medium sm:text-xl sm:font-semibold">
            Top by volume
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Stocks with highest volume
          </p>
        </div>

        <FilterIndices value={selectedIndex} onChange={setSelectedIndex} />
      </div>

      {/* Card */}
      <div className="p-2 mx-4 sm:mx-0 border rounded-2xl">
        <ItemGroup>
          {stocks?.slice(0, 4).map((item, index) => (
            <Row key={index} stock={item} />
          ))}
        </ItemGroup>
        <Button
          asChild
          variant="ghost"
          className="mt-2 text-muted-foreground w-full"
        >
          <Link to="/stocks/top-by-volume">
            See More <ChevronRightIcon />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default TopByVolumeSection;

function Row({ stock = {} }) {
  const symbol = stock.symbol;
  const live = useGetLiveData(symbol, { fallback: stock });
  const isPositive = live.change >= 0;

  return (
    <Item asChild className="border-b-border">
      <Link to={`/stocks/${symbol}`}>
        <ItemMedia>
          <StockLogo symbol={symbol} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{stock.longName || stock.shortName}</ItemTitle>
          <ItemDescription className="text-xs uppercase">
            {symbol}
          </ItemDescription>
        </ItemContent>

        <ItemContent className="items-end">
          <ItemTitle className="sm:leading-none">
            {isPositive ? "+" : ""} {formatToINR(live.price, 2, 2)}
          </ItemTitle>
          <ItemDescription className="sm:hidden">
            {live.volume?.toLocaleString("en-IN")}
          </ItemDescription>
          <ItemDescription
            className={cn(
              "max-sm:hidden",
              isPositive ? "text-positive" : "text-negative",
            )}
          >
            {isPositive ? "+" : ""} {live.change?.toFixed(2)} (
            {live.changePercent?.toFixed(2) + "%"})
          </ItemDescription>
        </ItemContent>

        <ItemContent className="items-end max-sm:hidden min-w-[18%]">
          <ItemTitle className="sm:leading-none">
            {live.volume?.toLocaleString("en-IN")}
          </ItemTitle>
          <ItemDescription>vol.</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
