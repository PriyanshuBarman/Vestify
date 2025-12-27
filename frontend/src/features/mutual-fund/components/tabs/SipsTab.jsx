import LoadingState from "@/components/LoadingState";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";
import { tz } from "@date-fns/tz";
import { differenceInCalendarDays, format, getDate } from "date-fns";
import { CalendarRangeIcon, Clock4Icon } from "lucide-react";
import { lazy } from "react";
import { Link } from "react-router";
import { useGetPendingOrders } from "../../hooks/useGetPendingOrders";
import { useGetSips } from "../../hooks/useGetSips";
import FundLogo from "../FundLogo";
const NoActiveSips = lazy(() => import("../empty-states/NoActiveSips"));

function SipsTab() {
  const { data, isPending } = useGetSips();
  if (isPending) return <LoadingState />;
  if (!data) return <NoActiveSips />;

  return (
    <div className="flex justify-center px-4 pb-20">
      <section className="w-full lg:w-1/2">
        {/* Title / Heading */}
        <div>
          <div>
            <span className="text-muted-foreground text-xs">
              Monthly SIP amount
            </span>
            <h2 className="text-2xl leading-tight font-semibold tabular-nums">
              {formatToINR(data?.totalActiveSipAmount, 2)}
            </h2>
          </div>

          <div className="mt-6 flex justify-between">
            <h2 className="text-sm font-medium sm:text-lg">
              Active SIPs ({data?.sips?.length})
            </h2>
            {/* <div className="flex items-center gap-2 text-xs">
          <ChevronsLeftRightIcon className="size-4" />{" "}
          <span>Sort by: Due date</span>
          </div> */}
          </div>
        </div>

        <ItemGroup>
          {data?.sips?.map((sip, index) => (
            <SipItem
              key={sip.id}
              sip={sip}
              index={index}
              length={data.sips.length}
            />
          ))}
        </ItemGroup>
      </section>
      <div className="hidden h-full w-1/2 lg:block">
        <img src="/sip.svg" alt="sip" className="h-50 sm:h-70" />
      </div>
    </div>
  );
}

export default SipsTab;

function SipItem({ sip, index, length }) {
  const { data: pendingOrders } = useGetPendingOrders();
  const dueWithinDays = differenceInCalendarDays(
    sip.nextInstallmentDate,
    new Date(),
    {
      in: tz("Asia/Kolkata"),
    },
  );

  const isProcessing = pendingOrders?.some((order) => order.sipId === sip.id);

  return (
    <>
      <Item asChild size="sm" className="px-0">
        <Link to={`/mutual-funds/sip/${sip.id}`}>
          <ItemMedia className="!self-center">
            <FundLogo
              noFormat
              fundHouseDomain={sip.fundHouseDomain}
              className="size-9"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-2 text-sm leading-tight font-[450] text-wrap">
              {sip.fundShortName}
            </ItemTitle>
            <ItemDescription className="flex items-center gap-4 text-sm font-medium">
              {formatToINR(sip.amount, 2)}

              {dueWithinDays < 5 && (
                <span className="flex items-center gap-1.5 text-xs font-normal">
                  <CalendarRangeIcon className="mb-0.5 size-4" /> Due in{" "}
                  {dueWithinDays} days
                </span>
              )}
              {isProcessing && (
                <span className="flex items-center gap-1.5 text-xs font-normal">
                  <Clock4Icon className="text-primary mb-0.5 size-4" /> In
                  progress
                </span>
              )}
            </ItemDescription>
          </ItemContent>
          <div className="Date mx-4 rounded-xl border px-3 py-2 text-center leading-tight">
            <h2 className="font-medium">{getDate(sip.nextInstallmentDate)}</h2>
            <span className="text-muted-foreground text-xs">
              {format(sip.nextInstallmentDate, "MMM")}
            </span>
          </div>
        </Link>
      </Item>
      {index !== length - 1 && <ItemSeparator />}
    </>
  );
}
