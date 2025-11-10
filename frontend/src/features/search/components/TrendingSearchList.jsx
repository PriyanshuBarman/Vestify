import { useGetPopularFunds } from "@/features/mutual-fund/hooks/useGetPopularFunds";
import { TrendingUpIcon } from "lucide-react";

function TrendingSearchList({ activeIdx, handleClick }) {
  const { data: popularFunds } = useGetPopularFunds();

  return (
    <div className="mt-2 px-2">
      <h6 className="text-sm sm:font-medium">Popular Funds</h6>

      <ul className="mt-4 flex flex-wrap justify-between gap-4 sm:gap-6">
        {popularFunds?.map((fund, idx) => (
          <li
            key={idx}
            onClick={() => handleClick(fund)}
            className={`${activeIdx === idx && "bg-accent"} hover:bg-accent flex w-full items-center justify-start gap-2 rounded-md border px-4 py-2 text-xs sm:text-sm`}
          >
            <TrendingUpIcon
              size={16}
              className="text-muted-foreground shrink-0"
            />
            <p className="truncate">{fund.short_name || fund.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingSearchList;
