import GoBackBar from "@/components/GoBackBar";
import { Link } from "react-router";
import FundLogo from "../components/FundLogo";
import { useGetAMCs } from "../hooks/useGetAMCs";

function FundHousesPage() {
  const { data: amcs } = useGetAMCs();
  return (
    <div>
      <GoBackBar />

      <section className="top-0 z-10">
        <div className="bg-background px-4 sm:mb-10 sm:space-y-4">
          <h2 className="text-lg font-semibold sm:text-2xl">Fund Houses </h2>
          <p className="text-muted-foreground flex flex-col text-sm">
            All Fund houses are ranked by the total AUM
            <i>Note: Total AUM & Fund count may differ from actual platform.</i>
          </p>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 justify-between gap-4 px-4 sm:m-0.5 sm:gap-x-12 sm:px-0 md:grid-cols-3 lg:grid-cols-4">
        {amcs?.map((amc) => (
          <Link
            key={amc.amc_code}
            to={`/mutual-funds/amc-funds/${amc.amc_code}`}
            state={{
              amcCode: amc.amc_code,
              amcName: amc.amc_name,
              fundHouseDomain: amc.detail_info,
              aum: amc.aum,
              rank:
                amcs.findIndex((item) => item.amc_code === amc.amc_code) + 1,
            }}
            className="w-full cursor-pointer space-y-2 rounded-2xl border p-3 duration-200 hover:scale-101 sm:m-0.5 sm:space-y-4 sm:p-4"
          >
            <div className="flex items-end gap-2 sm:gap-4">
              <FundLogo fundHouseDomain={amc.detail_info} className="size-9" />
              <p className="text-2xs sm:text-[0.9rem] sm:font-medium">
                {amc.fundCount}
                <span className="ml-0.5 text-[85%] sm:ml-1">Funds</span>
              </p>
            </div>
            <p className="line-clamp-1 text-xs font-[450] sm:text-sm sm:font-semibold">
              {amc.amc_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default FundHousesPage;
