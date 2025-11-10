import { selectActiveTabIndex } from "@/store/slices/mutualFundSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const TABS = [
  { name: "Explore", hash: "#explore" },
  { name: "Investments", hash: "#investments" },
  { name: "SIPs", hash: "#sips" },
  { name: "Watchlist", hash: "#watchlist" },
];

function Tabs() {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const location = useLocation();

  if (location.pathname !== "/mutual-funds" && !location?.hash) return;

  return (
    <div className="Tabs text-md bg-background scrollbar-none sticky top-0 z-10 mb-8 flex space-x-2 overflow-x-auto border-b pt-2 pl-2 font-[550] sm:pl-0 sm:font-semibold">
      {TABS.map((tab, idx) => (
        <a
          key={tab.name}
          href={tab.hash}
          className={`relative p-2.5 transition-all ease-in-out sm:p-3 ${activeTabIndex === idx ? "text-foreground after:bg-foreground after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-t-2xl after:content-[''] sm:after:h-1" : "text-muted-foreground"} `}
        >
          <span>{tab.name}</span>
        </a>
      ))}
    </div>
  );
}

export default Tabs;
