import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import FundLogo from "./FundLogo";

function CardLG({ fund }) {
  return (
    <Link to={`/mutual-funds/${fund.scheme_code}`}>
      <Card className="h-44 w-48 cursor-pointer justify-between gap-2 p-4 text-inherit duration-200 hover:scale-101">
        <FundLogo fundHouseDomain={fund.detail_info} />
        <CardTitle className="line-clamp-2 text-sm font-medium">
          {fund.short_name}
        </CardTitle>

        <CardFooter className="content-center space-x-2 p-0 font-[550]">
          <span className="text-md">
            {fund.return_3y ? fund.return_3y.toFixed(1) + "%" : "NA"}
          </span>
          <span className="text-muted-foreground text-sm">(3Y)</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
export default CardLG;
