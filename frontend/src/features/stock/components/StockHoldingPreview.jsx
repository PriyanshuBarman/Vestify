import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";
import { getChangeColor } from "@/utils/helper";

import { useGetLiveData } from "../hooks/useGetLiveData";
import { useGetSingleStockPortfolio } from "../hooks/useGetSingleStockPortfolio";

function StockHoldingPreview({ symbol, stock }) {
  const { data: stockPortfolio } = useGetSingleStockPortfolio(symbol);
  const live = useGetLiveData(symbol, { fallback: stock });

  if (!stockPortfolio || !stockPortfolio.quantity) return null;

  const invested = Number(stockPortfolio.invested || 0);
  const quantity = Number(stockPortfolio.quantity || 0);
  const currentPrice = live.price || (quantity > 0 ? invested / quantity : 0);
  const currentValue = quantity * currentPrice;
  const totalReturns = currentValue - invested;
  const returnPercent = invested > 0 ? (totalReturns / invested) * 100 : 0;

  return (
    <Item
      variant="outline"
      className="mx-4 mt-4 gap-2 rounded-2xl sm:p-6 sm:mx-0"
    >
      <ItemContent className="flex flex-row justify-between">
        <div>
          <ItemDescription className="text-sm">
            Invested / {stockPortfolio.quantity} qty
          </ItemDescription>
          <ItemTitle className="text-md tabular-nums sm:text-lg sm:font-medium">
            {formatToINR(invested)}
          </ItemTitle>
        </div>
        <div>
          <ItemDescription className="text-sm">Total returns</ItemDescription>
          <ItemTitle
            className={`text-md ml-auto tabular-nums sm:text-lg sm:font-medium ${getChangeColor(returnPercent)}`}
          >
            {returnPercent >= 0 ? "+" : ""}
            {returnPercent.toFixed(2)}%
          </ItemTitle>
        </div>
      </ItemContent>
      <ItemActions>
        <Link to="/stocks/holding-details" state={{ holding: stockPortfolio }}>
          <ChevronRightIcon className="text-muted-foreground size-5" />
        </Link>
      </ItemActions>
    </Item>
  );
}

export default StockHoldingPreview;
