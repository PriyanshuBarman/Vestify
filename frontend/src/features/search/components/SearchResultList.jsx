import { memo } from "react";
import CompanyLogo from "./CompanyLogo";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

function SearchResultList({
  searchResult,
  handleClick,
  activeIdx,
  searchType,
}) {
  if (!searchResult?.length) return null;

  return (
    <ul>
      {searchResult.map((item, idx) => (
        <li
          key={idx}
          onClick={() => handleClick(item)}
          className={`${activeIdx === idx && "bg-accent"} hover:bg-accent flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 sm:my-1`}
        >
          <CompanyLogo searchType={searchType} item={item} />
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="Fund-Name text-foreground max-w-[28ch] truncate text-sm sm:max-w-[30ch] sm:text-sm">
                {item.short_name || item.name}
              </p>
              <span className="Category text-muted-foreground text-xs">
                {item.fund_category || item.subcategory}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default memo(SearchResultList);
