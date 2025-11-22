import GoBackBar from "@/components/GoBackBar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { formatDate, formatDistanceToNow } from "date-fns";
import { ChevronRightIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import FundLogo from "../components/FundLogo";
import FundPortfolioSummary from "../components/FundPortfolioSummary";
import { useGetFundOrders } from "../hooks/useGetFundOrders";
import { formatToINR } from "@/utils/formatters";
import SectionHeading from "../components/SectionHeading";
import { orderTypeConfig } from "../constants/order";

function InvestmentDetailsPage() {
  const location = useLocation();
  const fund = location.state;
  const { data: orders } = useGetFundOrders(fund.schemeCode);

  return (
    <div className="sm:mx-auto sm:max-w-xl">
      <GoBackBar title="Investment details" />
      <Item size="sm" asChild>
        <Link to={`/mutual-funds/${fund.schemeCode}`}>
          <ItemMedia variant="image" className="sm:size-14">
            <FundLogo
              noFormat
              fundHouseDomain={fund.fundHouseDomain}
              className="h-full w-full"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{fund.fundShortName}</ItemTitle>
            <ItemDescription>
              Invested for {formatDistanceToNow(new Date(fund.createdAt))}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-5" />
          </ItemActions>
        </Link>
      </Item>

      <h3 className="mt-2 px-4 text-sm font-semibold">
        Folio no. {fund.folio}
      </h3>

      <FundPortfolioSummary fund={fund} className="mt-4" />

      {/* Fund Transaction history */}
      <section className="mt-8">
        <SectionHeading heading="Transaction history" />
        <div className="px-4">
          {orders?.map((order) => (
            <Link
              to={`/mutual-funds/orders/${order.id}`}
              key={order.id}
              className="flex justify-between border-b py-4"
            >
              <div className="max-w-[60%]">
                <h4 className="sm:text-md truncate text-sm sm:font-medium">
                  {orderTypeConfig[order.orderType]}
                </h4>
                <p className="text-muted-foreground mt-2 text-xs">
                  {formatDate(order.createdAt, "dd MMM, yy")}
                </p>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-sm font-medium tabular-nums sm:text-base">
                  {order.orderType === "REDEEM" ? "-" : "+"}
                  {formatToINR(order.amount, 2)}
                </span>
                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                  <span>
                    {Number(order.units)?.toFixed(3)} units /{" "}
                    {formatToINR(order.nav)} NAV
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
export default InvestmentDetailsPage;
