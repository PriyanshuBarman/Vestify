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

const orderTypeConfig = {
  ONE_TIME: "Invested",
  SIP_INSTALLMENT: "SIP Installment",
  NEW_SIP: "New SIP",
  REDEEM: "Redeem",
};

const statusConfig = {
  PENDING: "In Progress",
  COMPLETED: "Success",
  FAILED: "Failed",
};

function InvestmentDetailsPage() {
  const location = useLocation();
  const fund = location.state;

  const { data: orders } = useGetFundOrders(fund.schemeCode);

  return (
    <div className="sm:mx-auto sm:max-w-xl">
      <GoBackBar title="Investment details" />
      <Item asChild>
        <Link to={`/mutual-funds/${fund.schemeCode}`}>
          <ItemMedia variant="image" className="sm:size-14">
            <FundLogo
              noFormat
              fundHouseDomain={fund.fundHouseDomain}
              className="h-full w-full"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-md">{fund.shortName} Fund</ItemTitle>
            <ItemDescription>
              Invested for {formatDistanceToNow(new Date(fund.createdAt))}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon />
          </ItemActions>
        </Link>
      </Item>

      <h3 className="px-4 text-sm font-semibold">Folio no. XXXXXXXX</h3>

      <FundPortfolioSummary fund={fund} className="mt-4" />

      {/* Fund Transaction history */}
      <section className="mt-8">
        <SectionHeading heading="Transaction history" />
        <div className="px-4">
          {orders?.map((order) => (
            <Link
              to={`/mutual-funds/order/${order.id}`}
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
