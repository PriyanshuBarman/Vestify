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
import { format, getDate } from "date-fns";
import { lazy } from "react";
import { Link } from "react-router";
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
            <h2 className="text-xl leading-tight font-semibold tabular-nums">
              {formatToINR(data?.totalActiveSipAmount, 2)}
            </h2>
          </div>

          <div className="mt-6 flex justify-between">
            <h2 className="text-md font-medium sm:text-lg">
              Active SIPs ({data?.sips?.length})
            </h2>
            {/* <div className="flex items-center gap-2 text-xs">
          <ChevronsLeftRightIcon className="size-4" />{" "}
          <span>Sort by: Due date</span>
          </div> */}
          </div>
        </div>

        <ItemGroup className="mt-2">
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
  return (
    <>
      <Item asChild size="sm" className="px-0">
        <Link to={`/mutual-funds/sip/${sip.id}`}>
          <ItemMedia>
            <FundLogo
              noFormat
              fundHouseDomain={sip.fundHouseDomain}
              className="size-10"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-2 text-sm leading-tight text-wrap">
              {sip.fundShortName}
            </ItemTitle>
            <ItemDescription className="text-sm font-medium">
              {formatToINR(sip.amount, 2)}
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
