import { formatDate, formatDistanceToNow } from "date-fns";
import { ChevronRightIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import GoBackBar from "@/components/GoBackBar";
import SinglePortfolioSummary from "@/components/SinglePortfolioSummary";
import StockLogo from "@/components/StockLogo";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveData } from "../hooks/useGetLiveData";
import { useGetStockHoldings } from "../hooks/useGetStockHoldings";
import { enrichStockPortfolio } from "../utils/stockPortfolioUtils";

function HoldingDetailsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");

  const rawHolding = location.state?.holding || location.state || {};
  const {
    price: livePrice,
    change: liveChange,
    changePercent: liveChangePercent,
  } = useGetLiveData(rawHolding?.symbol);
  const { data: holdings = [], isPending } = useGetStockHoldings(
    rawHolding?.symbol,
    username,
  );

  // Enrich single holding with live market price and summary calculations
  const enrichedList = enrichStockPortfolio(
    [rawHolding],
    rawHolding?.symbol && livePrice
      ? {
          [rawHolding.symbol]: {
            regularMarketPrice: livePrice,
            regularMarketChange: liveChange,
            regularMarketChangePercent: liveChangePercent,
          },
        }
      : {},
  );
  const holding = enrichedList[0] || rawHolding;

  return (
    <div className="sm:mx-auto sm:max-w-xl">
      <GoBackBar title="Holding details" />
      <Item size="sm" asChild>
        <Link to={`/stocks/${holding.symbol}`}>
          <ItemMedia variant="image" className="sm:size-14">
            <StockLogo symbol={holding.symbol} className="h-full w-full" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              {holding.shortName || holding.name || holding.symbol}
            </ItemTitle>
            <ItemDescription>
              {holding.createdAt
                ? `Holding for ${formatDistanceToNow(new Date(holding.createdAt))}`
                : holding.symbol}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-5" />
          </ItemActions>
        </Link>
      </Item>

      <SinglePortfolioSummary summary={holding} type="stock" className="mt-4" />

      {/* Holding Transaction history */}
      <section className="mt-8">
        <div className="px-4 mb-2">
          <h3 className="text-lg font-semibold">Transaction history</h3>
        </div>
        <div className="px-4">
          {isPending ? (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Loading...
            </p>
          ) : !holdings || holdings.length === 0 ? (
            <p className="text-muted-foreground py-4 text-center text-sm">
              No transactions found
            </p>
          ) : (
            holdings.map((item) => <HoldingItem key={item.id} item={item} />)
          )}
        </div>
      </section>
    </div>
  );
}

export default HoldingDetailsPage;

function HoldingItem({ item }) {
  const amount = Number(item.amount || 0);
  const price = Number(item.price || 0);
  const quantity = Number(item.quantity || 0);

  return (
    <div className="flex w-full justify-between border-b py-4">
      <div className="max-w-[60%]">
        <h4 className="sm:text-md truncate text-sm sm:font-medium">BUY</h4>
        <p className="text-muted-foreground mt-2 text-xs">
          {item.createdAt
            ? formatDate(new Date(item.createdAt), "dd MMM, yy")
            : "-"}
        </p>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-sm font-medium tabular-nums sm:text-base">
          + {formatToINR(amount, 2)}
        </span>
        <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
          <span>
            {quantity} {quantity === 1 ? "share" : "shares"} /{" "}
            {formatToINR(price)} avg
          </span>
        </div>
      </div>
    </div>
  );
}
