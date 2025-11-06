import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CompassIcon } from "lucide-react";
import { Link } from "react-router";
import SectionHeading from "../SectionHeading";

const cardsMapping = [
  {
    label: "Compare Funds",
    img: "/compare_funds.svg",
    to: "/mutual-funds/compare-funds",
  },
  {
    label: "Sip Calculator",
    img: "/calculator.svg",
    to: "/mutual-funds/sip-calculator",
  },
  { label: "NFOs", img: "/nfo.svg", to: "/mutual-funds/#explore" },
];

function QuickAccessSection() {
  return (
    <section className="swiper-no-swiping">
      <SectionHeading heading={"Quick Access"} />

      <ScrollArea>
        <div className="flex justify-between gap-4 px-4 sm:m-0.5 sm:gap-4.5 sm:px-0">
          <Link to="/mutual-funds/all-funds">
            <Card className="w-36 cursor-pointer justify-between gap-2 p-3 sm:w-46 sm:min-w-40 sm:p-4 sm:transition-all sm:duration-500 sm:hover:scale-101">
              <CardContent className="flex flex-col items-start gap-1 p-0">
                <CompassIcon className="size-6 sm:size-7" />
              </CardContent>
              <CardFooter className="px-0 text-[0.8rem] font-normal sm:text-base">
                Screener
              </CardFooter>
            </Card>
          </Link>

          {cardsMapping.map(({ label, img, to }) => (
            <Link key={label} to={to}>
              <Card className="w-36 cursor-pointer gap-2 p-3 sm:w-46 sm:min-w-40 sm:p-4 sm:transition-all sm:duration-500 sm:hover:scale-101">
                <CardContent className="p-0">
                  <img
                    src={img}
                    alt={label + " Logo"}
                    className="min-h-6 min-w-6 sm:size-7 dark:brightness-0 dark:invert"
                    loading="lazy"
                  />
                </CardContent>
                <CardFooter className="px-0 text-[0.8rem] font-normal sm:text-base">
                  {label}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}

export default QuickAccessSection;
