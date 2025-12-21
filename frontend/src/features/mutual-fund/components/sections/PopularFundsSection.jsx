import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/useIsMobile";
import { lazy } from "react";
import { useGetPopularFunds } from "../../hooks/useGetPopularFunds";
import { usePrefetchPopularFunds } from "../../hooks/usePrefetchPopularFunds";
import SectionHeading from "../SectionHeading";

const CardLG = lazy(() => import("../CardLG"));
const CardSM = lazy(() => import("../CardSM"));

function PopularFundsSection() {
  const { data: funds } = useGetPopularFunds();
  const isMobile = useIsMobile();
  usePrefetchPopularFunds(funds);

  return (
    <section className="swiper-no-swiping">
      <SectionHeading
        heading={"Popular Funds"}
        subHeading={"View all"}
        navigateTo="/mutual-funds/all-funds"
      />
      <ScrollArea>
        <div className="flex justify-between gap-4 px-4 sm:m-0.5 sm:gap-3 sm:px-0">
          {funds.map((fund, index) =>
            isMobile ? (
              <CardSM key={index} fund={fund} />
            ) : (
              <CardLG key={index} fund={fund} />
            ),
          )}
        </div>
        <ScrollBar orientation="horizontal" className="max-sm:hidden" />
      </ScrollArea>
    </section>
  );
}

export default PopularFundsSection;
