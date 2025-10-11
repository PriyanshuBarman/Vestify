import LoadingState from "@/components/LoadingState";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/useIsMobile";
import { formatToINR } from "@/utils/formatters";
import { format, getDate } from "date-fns";
import { Link } from "react-router";
import { useGetFundsByFilter } from "../hooks/useGetFundsByFilter";
import { useGetSips } from "../hooks/useGetSips";
import CardLG from "./CardLG";
import CardSM from "./CardSM";
import FundLogo from "./FundLogo";
import SectionHeading from "./SectionHeading";

function SipsTab() {
  const { data, isPending } = useGetSips();

  if (isPending) return <LoadingState />;
  if (!data) return <NoActiveSips />;

  return (
    <div className="px-4">
      {/* Title / Heading */}
      <div>
        <div>
          <span className="text-muted-foreground text-xs">
            Monthly SIP amount
          </span>
          <h2 className="text-xl font-medium">
            {formatToINR(data?.totalActiveSipAmount, 2)}
          </h2>
        </div>

        <div className="mt-4 flex justify-between">
          <h2 className="text-sm font-medium sm:text-lg">
            Active SIPs ({data?.sips?.length})
          </h2>
          {/* <div className="flex items-center gap-2 text-xs">
          <ChevronsLeftRightIcon className="size-4" />{" "}
          <span>Sort by: Due date</span>
          </div> */}
        </div>
      </div>

      {data?.sips?.map((sip) => (
        <Link key={sip.id} to={`/mutual-funds/sip/${sip.id}`}>
          <div className="flex items-center justify-between border-b py-4">
            <FundLogo
              noFormat
              fundHouseDomain={sip.fundHouseDomain}
              className="size-10"
            />

            <div className="ml-4 flex-1">
              <h4 className="Fund-Name text-sm text-wrap">{sip.fundName}</h4>
              <p className="text-muted-foreground mt-1 text-sm font-medium">
                {formatToINR(sip.amount, 2)}
              </p>
            </div>

            <div className="Date mx-4 rounded-xl border px-3 py-2 text-center leading-tight">
              <h2 className="font-medium">
                {getDate(sip.nextInstallmentDate)}
              </h2>
              <span className="text-muted-foreground text-xs">
                {format(sip.nextInstallmentDate, "MMM")}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SipsTab;

function NoActiveSips() {
  const { data: funds } = useGetFundsByFilter({ sip_min: 100, limit: 6 });
  const isMobile = useIsMobile();

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2">
        <img src="/sip.svg" alt="sip" className="h-50 sm:h-70" />
        <h3 className="text-foreground-secondary font-medium sm:text-lg">
          No Active SIP's
        </h3>
        <p className="text-xs sm:text-sm">
          When you will start an SIP, it will appear here
        </p>
      </div>

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
    </div>
  );
}
