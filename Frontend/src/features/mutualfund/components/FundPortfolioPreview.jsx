import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";
import { useGetFundPortfolio } from "../hooks/useGetFundPortfolio";

function FundPortfolioPreview({ schemeCode }) {
  const { data: fundPortfolio } = useGetFundPortfolio(schemeCode);

  if (!fundPortfolio) return null;

  return (
    <Item
      variant="outline"
      className="bg-card mx-4 mt-4 gap-2 rounded-2xl sm:p-6"
    >
      <ItemContent className="flex flex-row justify-between">
        <div>
          <ItemDescription className="text-sm">Invested</ItemDescription>
          <ItemTitle className="text-md tabular-nums sm:text-lg sm:font-medium">
            {formatToINR(fundPortfolio.invested || 0)}
          </ItemTitle>
        </div>
        <div>
          <ItemDescription className="text-sm">Total returns</ItemDescription>
          <ItemTitle
            className={`text-md ml-auto tabular-nums sm:text-lg sm:font-medium ${fundPortfolio.current >= fundPortfolio.returnPercent ? "text-positive" : "text-negative"}`}
          >
            {fundPortfolio.returnPercent || 0}%
          </ItemTitle>
        </div>
      </ItemContent>
      <ItemActions>
        <Link to="/mutual-funds/investment-details" state={fundPortfolio}>
          <ChevronRightIcon className="text-muted-foreground size-5" />
        </Link>
      </ItemActions>
    </Item>
  );
}

export default FundPortfolioPreview;
