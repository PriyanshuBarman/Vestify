import { Link } from "react-router";
import { useRecentlyViewedFunds } from "../../hooks/useRecentlyViewedFunds";
import FundLogo from "../FundLogo";
import SectionHeading from "../SectionHeading";

function RecentlyViewedSection() {
  const funds = useRecentlyViewedFunds();

  if (!funds.length) return null;

  return (
    <section className="swiper-no-swiping">
      <SectionHeading heading={"Recently viewed"} />
      <div className="flex flex-wrap justify-between gap-x-2 gap-y-3 px-4 sm:px-0">
        {funds?.map((fund) => (
          <Link
            key={fund.scheme_code}
            to={`/mutual-funds/${fund.scheme_code}`}
            className="flex w-[48%] cursor-pointer items-center gap-2 rounded-2xl sm:rounded-[1.25rem] border px-3 py-3 duration-200 hover:scale-101 sm:m-0.5"
          >
            <FundLogo fundHouseDomain={fund.detail_info} />
            <p className="sm:text-foreground line-clamp-2 text-xs sm:text-sm sm:font-medium">
              {fund.short_name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewedSection;
