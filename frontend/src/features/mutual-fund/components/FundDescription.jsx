import { Separator } from "@/components/ui/separator";
import { formatToINR } from "@/utils/formatters";

function FundDescription({ fund }) {
  let d = new Date(fund.nav?.date);
  let date = d.toLocaleDateString("en-GB", { dateStyle: "medium" });

  return (
    <div className="relative mt-8 ml-4 flex sm:mt-14 sm:ml-0 sm:justify-between sm:gap-20">
      <section className="Left flex w-1/2 flex-col gap-6 text-xs sm:text-base">
        <div className="row-1 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground">NAV: {date}</p>
          <p className="font-medium max-sm:text-sm">
            {formatToINR(fund.nav?.nav, 2)}
          </p>
        </div>

        <div className="row-2 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground">Min Investment Amt.</p>
          <div className="flex gap-1.5 max-sm:text-sm">
            <p>
              <span className="text-xs">SIP </span>
              <span className="font-medium">{formatToINR(fund.sip_min)}</span>
            </p>
            <Separator
              orientation="vertical"
              className="bg-muted-foreground rotate-15"
            />
            <p>
              <span className="text-xs">Lump. </span>
              <span className="font-medium">{formatToINR(fund.lump_min)}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="Right flex w-1/2 flex-col gap-6 text-xs sm:text-base">
        <div className="row-1 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground">Rating</p>
          <p className="flex items-center font-medium max-sm:text-sm">
            {fund.fund_rating || "NA"}
            <span className="ml-2 text-lg leading-none">
              {fund.fund_rating ? "★" : ""}
            </span>
          </p>
        </div>
        <div className="row-1 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground">Fund Size</p>
          <p className="font-medium max-sm:text-sm">
            {formatToINR(fund.aum / 10, 1)}Cr
          </p>
        </div>
      </section>

      <div className="bg-input absolute left-1/2 h-full w-px -translate-x-1/2 max-sm:hidden"></div>
    </div>
  );
}

export default FundDescription;
