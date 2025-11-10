import { useGetFundCategoryRanking } from "../../hooks/useGetFundCategoryRanking";

function ReturnAndRanking({ schemeCode, fund_type, fund_category }) {
  const { data = {} } = useGetFundCategoryRanking(schemeCode);
  const periods = ["1Y", "3Y", "5Y", "All"];

  return (
    <div className="text-muted-foreground sm:text-base">
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-tighter sm:text-sm">
          Category: {fund_type} {fund_category}
        </span>
        <span className="text-primary font-[550] sm:font-semibold">
          Annualized
        </span>
      </div>

      {/* Content */}
      <div className="mt-6 grid grid-cols-[auto_repeat(4,minmax(0,1fr))] items-center gap-x-4 gap-y-6 sm:mt-12">
        {/* Header Row (1Y, 3Y, 5Y, All) */}
        <div className="font-medium"></div>
        {periods.map((period) => (
          <div key={period} className="text-center font-[550] sm:font-semibold">
            {period}
          </div>
        ))}

        {/* Fund Returns Row */}
        <div className="w-fit font-[550] whitespace-nowrap sm:font-semibold">
          Fund returns (%)
        </div>
        {periods.map((period) => (
          <div key={`returns-${period}`} className="text-center">
            {typeof data?.returns?.[period] === "number"
              ? data.returns[period]?.toFixed(1)
              : "-"}
          </div>
        ))}

        {/* Category Average Row */}
        <div className="w-fit font-[550] whitespace-nowrap sm:font-semibold">
          Category Avg. (%)
        </div>
        {periods.map((period) => (
          <div key={`category-${period}`} className="text-center">
            {typeof data?.category_average?.[period] === "number"
              ? data.category_average[period]?.toFixed(1)
              : "-"}
          </div>
        ))}

        {/* Rank in Category Row */}
        <div className="w-fit font-[550] whitespace-nowrap sm:font-semibold">
          Rank in category
        </div>
        {periods.map((period) => (
          <div key={`rank-${period}`} className="text-center">
            {data?.rank_in_category?.[period] || "-"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReturnAndRanking;
