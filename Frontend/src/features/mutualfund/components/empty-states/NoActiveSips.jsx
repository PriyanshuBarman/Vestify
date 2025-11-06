import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Link } from "react-router";
import { useGetFundsByFilter } from "../../hooks/useGetFundsByFilter";
import SectionHeading from "../SectionHeading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CardLG from "../CardLG";
import CardSM from "../CardSM";

function NoActiveSips() {
  const { data: funds } = useGetFundsByFilter({ sip_min: 100, limit: 6 });
  const isMobile = useIsMobile();

  return (
    <>
      <Empty>
        <EmptyHeader className="max-w-none">
          <EmptyMedia>
            <img src="/sip.svg" alt="No Active SIPs" className="h-50 sm:h-70" />
          </EmptyMedia>
          <EmptyTitle>No Active SIPs</EmptyTitle>
          <EmptyDescription>
            Your SIPs will appear here once you start one.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link to="/mutual-funds/all-funds">Start SIP</Link>
          </Button>
        </EmptyContent>
      </Empty>

      <section className="swiper-no-swiping mt-26 sm:mt-12">
        <SectionHeading heading={"Start SIP with ₹100"} />
        <ScrollArea>
          <div className="flex justify-between gap-4 px-4 sm:m-0.5 sm:gap-3 sm:px-0">
            {funds?.map((fund) =>
              isMobile ? (
                <CardSM key={fund.id} fund={fund} />
              ) : (
                <CardLG key={fund.id} fund={fund} />
              ),
            )}
          </div>
          <ScrollBar orientation="horizontal" className="max-sm:hidden" />
        </ScrollArea>
      </section>
    </>
  );
}

export default NoActiveSips;
