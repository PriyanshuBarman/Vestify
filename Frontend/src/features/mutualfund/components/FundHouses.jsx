import { Link } from "react-router";
import { useGetAMCs } from "../hooks/useGetAMCs";
import FundLogo from "./FundLogo";
import SectionHeading from "./SectionHeading";

function FundHouses() {
  const { data: amcs } = useGetAMCs();

  return (
    <section className="swiper-no-swiping">
      <SectionHeading
        heading={"Fund Houses"}
        subHeading={"View all"}
        navigateTo="/mutual-funds/fund-houses"
      />

      <div className="scrollbar-none grid auto-cols-[49%] grid-flow-col grid-rows-2 gap-3 px-4 max-sm:overflow-auto sm:m-0.5 sm:auto-cols-fr sm:gap-x-4 sm:px-0">
        {amcs?.slice(0, 6).map((amc) => (
          <Link
            key={amc.amc_code}
            to={`/mutual-funds/amc-funds`}
            state={{
              amcCode: amc.amc_code,
              amcName: amc.amc_name,
              fundHouseDomain: amc.detail_info,
              aum: amc.aum,
              rank:
                amcs.findIndex((item) => item.amc_code === amc.amc_code) + 1,
            }}
            className="bg-card cursor-pointer space-y-2 rounded-2xl border p-3 duration-200 hover:scale-101 sm:m-0.5 sm:space-y-4 sm:p-4"
          >
            <div className="flex items-end gap-2 sm:gap-4">
              <FundLogo fundHouseDomain={amc.detail_info} />
              <p className="text-2xs sm:text-[0.9rem] sm:font-[450]">
                {amc.fundCount}
                <span className="ml-0.5 text-[85%] sm:ml-1">Funds</span>
              </p>
            </div>
            <p className="line-clamp-1 text-xs font-[450] sm:text-sm sm:font-medium">
              {amc.amc_name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
export default FundHouses;

// {amcs?.slice(0, 4).map((amc) => (
//   <Link className="w-[47%] cursor-pointer place-items-center space-y-2 rounded-2xl border px-2 py-3 duration-200 hover:scale-101 sm:m-0.5">
//     <div className="flex items-end gap-4">
//       <FundLogo
//         fundHouseDomain={amc.detail_info}
//         className="size-10"
//       />
//       <span className="text-muted-foreground text-xs">
//         {/* {amc.fundCount} funds */}
//       </span>
//     </div>
//     <p className="sm:text-foreground line-clamp-1 text-center text-xs sm:text-sm sm:font-medium">
//       {amc.amc_name}
//     </p>
//   </Link>
// ))}

{
  /* <Link className="w-[47%] cursor-pointer space-y-2 rounded-2xl border p-3 py-4 duration-200 hover:scale-101 sm:m-0.5">
<div className="flex items-end gap-2">
  <FundLogo fundHouseDomain={amc.detail_info} className="" />
  <span className="text-muted-foreground text-2xs">
    {Math.floor(amc.fundCount / 10) * 10}+
    <span className="text-2xs ml-0.5">funds</span>
  </span>
</div>
<p className="line-clamp-1 text-xs font-medium sm:text-sm">
  {amc.amc_name}
</p>
</Link> */
}

{
  /* <Link
to={`/mutual-funds/${amc.scheme_code}`}
className="flex w-[47%] cursor-pointer items-center gap-2 rounded-2xl border px-3 py-3 duration-200 hover:scale-101 sm:m-0.5"
>
<FundLogo fundHouseDomain={amc.detail_info} className="size-8" />
<p className="text-foreground font-medium sm:text-foreground line-clamp-2 text-xs sm:text-sm sm:font-medium">
  {amc.amc_name}
</p>
</Link> */
}
