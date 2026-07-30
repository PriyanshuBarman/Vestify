import { useMemo } from "react";
import { useSelector } from "react-redux";

import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import { formatToINR } from "@/utils/formatters";
import { getChangeColor } from "@/utils/helper";

import { useGetPortfolio } from "../hooks/useGetPortfolio";
import { useSubscribeStock } from "../hooks/useSubscribeStock";
import {
  calculateStockPortfolioSummary,
  enrichStockPortfolio,
} from "../utils/stockPortfolioUtils";

function YourInvestments() {
  const { data: rawPortfolio = [] } = useGetPortfolio();
  const liveStocks = useSelector((state) => state.stock.liveStocks || {});

  const portfolioSymbols = useMemo(
    () => rawPortfolio.map((item) => item.symbol).filter(Boolean),
    [rawPortfolio],
  );

  useSubscribeStock(portfolioSymbols);

  const summary = useMemo(() => {
    const enriched = enrichStockPortfolio(rawPortfolio, liveStocks);
    return calculateStockPortfolioSummary(enriched);
  }, [rawPortfolio, liveStocks]);

  if (!rawPortfolio?.length) return null;

  return (
    <div className="w-sm">
      <SectionHeading heading={"Your investments"} />
      <Card className="mt-4 rounded-3xl">
        <CardContent className="flex justify-between text-center lg:flex-col xl:flex-row">
          <div>
            <span
              className={`font-semibold tabular-nums sm:text-lg ${getChangeColor(summary.pnl)} `}
            >
              {formatToINR(summary.pnl || 0)}
            </span>
            <br />
            <span className="text-sm">Total Returns</span>
          </div>
          <div>
            <span className="font-medium tabular-nums sm:text-lg">
              {formatToINR(summary.current || 0)}
            </span>
            <br />
            <span className="text-sm">Current Value</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default YourInvestments;
