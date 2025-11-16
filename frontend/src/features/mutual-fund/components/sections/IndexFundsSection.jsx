import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router";
import { useGetIndexFunds } from "../../hooks/useGetIndexFunds";
import FundLogo from "../FundLogo";
import SectionHeading from "../SectionHeading";

function IndexFundsSection() {
  const { data: funds } = useGetIndexFunds();

  return (
    <section className="swiper-no-swiping">
      <SectionHeading
        heading={"Index Funds"}
        subHeading={"View all"}
        navigateTo="/mutual-funds/collections"
        navState={{
          label: "Index Funds",
          filters: {
            limit: 20,
            plan: "GROWTH",
            fund_category: "Index Funds",
          },
          description:
            "Index funds track a particular market index, such as NIFTY or Sensex, at a lower cost, providing diversification and professional management.",
        }}
      />

      <ScrollArea>
        <div className="flex justify-between gap-3 px-4 sm:m-0.5 sm:gap-3 sm:px-0">
          {funds?.map((fund) => (
            <Link
              key={fund.scheme_code}
              to={`/mutual-funds/${fund.scheme_code}`}
            >
              <Card className="h-40 w-40 cursor-pointer justify-between gap-0 p-4 text-inherit duration-200 hover:scale-101 sm:h-44 sm:w-48">
                <FundLogo fundHouseDomain={fund.detail_info} />
                <CardTitle className="text-xs font-[450] sm:text-sm sm:font-medium">
                  {fund.short_name}
                </CardTitle>

                <CardFooter className="space-x-2 p-0 font-[550]">
                  <span className="text-foreground sm:text-md text-sm">
                    {fund.return_3y ? fund.return_3y.toFixed(1) + "%" : "NA"}
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    (3Y)
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="max-sm:hidden" />
      </ScrollArea>
    </section>
  );
}

export default IndexFundsSection;
