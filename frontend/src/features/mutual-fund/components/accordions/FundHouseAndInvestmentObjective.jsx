import { ChevronRightIcon } from "lucide-react";
import FundLogo from "../FundLogo";
import { Link } from "react-router";
import { useGetAMCs } from "../../hooks/useGetAMCs";
import { useState } from "react";
import { formatToINR } from "@/utils/formatters";

function FundHouseAndInvestmentObjective({ fund }) {
  const [textClamp, setTextClamp] = useState(true);
  const { data: amcs } = useGetAMCs();
  const amc = amcs?.find((amc) => amc.amc_code === fund.amc_code);

  return (
    <div className="space-y-8">
      <Link className="mt-4 flex items-center">
        <FundLogo fundHouseDomain={fund.detail_info} className="size-8" />
        <h2 className="ml-2 text-xs font-medium tracking-tight sm:ml-4 sm:text-base">
          {fund.amc_name}
        </h2>
        <Link
          to={`/mutual-funds/amc-funds/${fund.amc_code}`}
          className="text-primary ml-auto flex items-center text-[0.8rem] font-medium sm:text-base"
        >
          All funds <ChevronRightIcon className="size-4" />
        </Link>
      </Link>
      <div className="AUM Details relative space-y-4 text-[0.8rem] sm:flex sm:flex-wrap sm:justify-between sm:gap-y-6 sm:text-base">
        <p className="flex w-full justify-between sm:w-[45%]">
          <span className="sm:text-muted-foreground">Rank (total assets)</span>
          <span className="sm:font-[450]">#{amc.rank} in India</span>
        </p>
        <p className="flex w-full justify-between sm:w-[45%]">
          <span className="sm:text-muted-foreground">Total AUM</span>
          <span className="sm:font-[450]">
            {formatToINR(amc?.totalAum / 10, 0)} Crores
          </span>
        </p>
      </div>
      <div>
        <h5 className="font-[450] sm:text-base">Investment Objective</h5>
        <p
          onClick={() => setTextClamp(!textClamp)}
          className={`text-muted-foreground mt-2 text-[0.8rem]/4.5 sm:mt-2 sm:text-base ${textClamp ? "line-clamp-3" : ""}`}
        >
          {fund.investment_objective}
        </p>
      </div>
    </div>
  );
}
export default FundHouseAndInvestmentObjective;
