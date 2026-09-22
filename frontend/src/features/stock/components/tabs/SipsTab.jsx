import { lazy } from "react";
import { tz } from "@date-fns/tz";
import { differenceInCalendarDays, format, getDate } from "date-fns";
import { CalendarRangeIcon } from "lucide-react";
import { Link } from "react-router";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import LoadingState from "@/components/LoadingState";
import StockLogo from "@/components/StockLogo";
import { formatToINR } from "@/utils/formatters";

import { useGetSips } from "../../hooks/useGetSips";

const NoActiveSips = lazy(
  () => import("@/components/empty-states/NoActiveSips"),
);

function SipsTab({ isActive, username }) {
  const isOtherUserProfile = Boolean(username);
  const { data, isLoading } = useGetSips(username);

  if (isLoading || !isActive) return <LoadingState />;
  if (!data?.sips?.length) return <NoActiveSips />;

  return (
    <div className="flex w-full justify-center px-4 pb-20">
      <section className="flex-1 lg:w-1/2">
        {/* Title / Heading */}
        <div>
          <div className="flex justify-between">
            <h2 className="text-md font-medium sm:text-lg">
              Active SIPs ({data?.sips?.length})
            </h2>
          </div>
        </div>

        <ItemGroup className="w-full">
          {data?.sips?.map((sip, index) => (
            <SipItem
              key={sip.id}
              sip={sip}
              index={index}
              length={data.sips.length}
              username={username}
              isOtherUserProfile={isOtherUserProfile}
            />
          ))}
        </ItemGroup>
      </section>

      {!isOtherUserProfile && (
        <div className="hidden h-full w-1/2 lg:block">
          <img
            src="/sip.svg"
            alt="sip"
            loading="lazy"
            draggable="false"
            className="h-50 sm:h-70"
          />
        </div>
      )}
    </div>
  );
}

export default SipsTab;

function SipItem({ sip, index, length, username, isOtherUserProfile }) {
  const dueWithinDays = differenceInCalendarDays(
    sip.nextInstallmentDate,
    new Date(),
    {
      in: tz("Asia/Kolkata"),
    },
  );

  return (
    <>
      <Item asChild size="sm" className="px-0">
        <Link
          to={
            isOtherUserProfile
              ? `/community/${username}/stocks/sips/${sip.id}`
              : `/stocks/sips/${sip.id}`
          }
        >
          <ItemMedia className="!self-center">
            <StockLogo symbol={sip.symbol} className="size-9" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-2 leading-tight font-[450] text-wrap">
              {sip.name || sip.shortName || sip.symbol}
            </ItemTitle>
            <ItemDescription className="flex items-center gap-4 text-sm font-[450]">
              {sip.type === "AMOUNT"
                ? formatToINR(sip.amount, 2)
                : `${sip.quantity} shares`}

              {dueWithinDays < 5 && !isOtherUserProfile && (
                <span className="flex items-center gap-1.5 text-xs font-normal">
                  <CalendarRangeIcon className="mb-0.5 size-4" /> Due in{" "}
                  {dueWithinDays} days
                </span>
              )}
            </ItemDescription>
          </ItemContent>
          <div className="Date mx-4 rounded-xl border px-3 py-2 text-center leading-tight">
            <h2 className="font-medium">{getDate(sip.nextInstallmentDate)}</h2>
            <span className="text-muted-foreground text-xs">
              {format(new Date(sip.nextInstallmentDate), "MMM")}
            </span>
          </div>
        </Link>
      </Item>
      {index !== length - 1 && <ItemSeparator />}
    </>
  );
}
