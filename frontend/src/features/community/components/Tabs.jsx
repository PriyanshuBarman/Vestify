import { cn } from "@/lib/utils";

function Tabs({ swiper, activeTabIndex, className }) {
  return (
    <div
      className={cn(
        `bg-background scrollbar-none sticky top-0 z-10 mb-6 flex space-x-2 overflow-y-auto border-b px-4 pt-2 sm:justify-center ${className}`,
      )}
    >
      {["Investments", "SIPs", "Watchlist"].map((tab, idx) => (
        <button
          key={tab}
          onClick={() => {
            swiper?.slideTo(idx);
          }}
          className={`text-md relative p-2.5 font-[550] transition-all ease-in-out sm:p-3 sm:text-[1.05rem] sm:font-semibold ${
            activeTabIndex === idx
              ? "text-foreground after:bg-foreground after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-t-2xl after:content-[''] sm:after:h-1"
              : "text-muted-foreground"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
export default Tabs;
