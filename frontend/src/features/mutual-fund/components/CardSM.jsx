import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import FundRating from "@/features/mutual-fund/components/FundRating";
import { Link } from "react-router";
import FundLogo from "./FundLogo";

function CardSM({ fund }) {
  return (
    <Link to={`/mutual-funds/${fund.scheme_code}`}>
      <Card className="min-w-72 gap-2 p-4">
        <FundLogo fundHouseDomain={fund.detail_info} className="size-8.5" />

        <CardContent className="p-0">
          <CardTitle className="flex justify-between gap-2 text-sm font-[450]">
            <p className="line-clamp-1">{fund.short_name}</p>
            <p className="text-[0.8rem]">{fund.return_3y}%</p>
          </CardTitle>

          <CardDescription className="flex items-center justify-between pr-2 text-xs">
            <div className="flex gap-2 text-xs">
              <span>{fund.category}</span>
              <span>{fund.fund_category}</span>
              <FundRating rating={fund.fund_rating} />
            </div>
            <span>3Y</span>
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
export default CardSM;
