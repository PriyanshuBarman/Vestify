import { Card, CardContent } from "@/components/ui/card";
import { formatToINR } from "@/utils/formatters";
import { getChangeColor } from "@/utils/helper";
import { useGetPortfolioSummary } from "../hooks/useGetPortfolioSummary";
import SectionHeading from "./SectionHeading";

function YourInvestments() {
  const { data: portfolio = {} } = useGetPortfolioSummary();

  return (
    <div className="h-full w-sm">
      <SectionHeading heading={"Your investments"} subHeading={"Dashboard"} />
      <Card className="mt-4">
        <CardContent className="flex justify-between text-center lg:flex-col xl:flex-row">
          <div>
            <span
              className={`font-semibold tabular-nums sm:text-lg ${getChangeColor(portfolio.pnl)} `}
            >
              {formatToINR(portfolio.pnl || 0)}
            </span>
            <br />
            <span className="text-sm">Total Returns</span>
          </div>
          <div>
            <span className="font-medium tabular-nums sm:text-lg">
              {formatToINR(portfolio.current || 0)}
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
