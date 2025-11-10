import { HistoryIcon } from "lucide-react";
import { memo } from "react";
import { useSelector } from "react-redux";

function SearchHistoryList({ handleClick, activeIdx, searchType }) {
  const searchHistory = useSelector((state) => state.search.searchHistory);

  return (
    <ul>
      {searchHistory[searchType]?.map((item, idx) => (
        <li
          key={item.scheme_code}
          onClick={() => handleClick(item)}
          className={`${activeIdx === idx && "bg-accent"} hover:bg-accent flex cursor-pointer place-items-center gap-4 rounded-xl px-4 py-4 sm:py-5`}
        >
          <HistoryIcon size={18} className="text-muted-foreground" />
          <p className="Fund-Name max-w-[28ch] truncate text-sm sm:max-w-[30ch] sm:text-[0.95rem]">
            {item.short_name || item.name}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default memo(SearchHistoryList);
