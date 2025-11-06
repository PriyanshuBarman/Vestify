import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useGetPopularFunds } from "../../hooks/useGetPopularFunds";
import CardLG from "../CardLG";
import CardSM from "../CardSM";
import SectionHeading from "../SectionHeading";

function PopularFundsSection() {
  const { data: funds } = useGetPopularFunds();
  const isMobile = useIsMobile();

  return (
    <section className="swiper-no-swiping">
      <SectionHeading
        heading={"Popular Funds"}
        subHeading={"View all"}
        navigateTo="/mutual-funds/all-funds"
      />
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
  );
}

export default PopularFundsSection;
