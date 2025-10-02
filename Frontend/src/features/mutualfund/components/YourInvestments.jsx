import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "react-responsive";
import { useGetPortfolioSummary } from "../hooks/useGetPortfolioSummary";
import SectionHeading from "./SectionHeading";
import { formatToINR } from "@/utils/formatters";

function YourInvestments() {
  const { data: portfolio = {} } = useGetPortfolioSummary();

  const hide = useMediaQuery({ maxWidth: 1125 });
  if (hide) return null;

  return (
    <div className="h-full w-sm">
      <SectionHeading heading={"Your investments"} subHeading={"Dashboard"} />
      <Card className="mt-4">
        <CardContent className="flex justify-between text-center lg:flex-col xl:flex-row">
          <div>
            <span
              className={`font-semibold tabular-nums sm:text-lg ${portfolio && portfolio.pnl < 0 ? "text-negative" : "text-positive"} `}
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
