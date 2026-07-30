import { lazy, Suspense, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LoadingState from "@/components/LoadingState";

import "swiper/css";

import { HashNavigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Tabs from "./Tabs";

const StockHoldingsTab = lazy(
  () => import("../../stock/components/tabs/HoldingsTab"),
);
const StockOrdersTab = lazy(
  () => import("../../stock/components/tabs/OrdersTab"),
);
const StockWatchlistTab = lazy(
  () => import("../../stock/components/tabs/WatchlistTab"),
);

const TABS = [
  { id: 0, name: "holdings", component: StockHoldingsTab },
  { id: 1, name: "orders", component: StockOrdersTab },
  { id: 2, name: "watchlist", component: StockWatchlistTab },
];

function StockTabs({ username }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const tabsList = ["Holdings", "Orders", "Watchlist"];

  return (
    <div>
      <Tabs
        swiper={swiper}
        activeTabIndex={activeTabIndex}
        tabsList={tabsList}
        className="max-sm:sticky max-sm:top-[232px]"
      />
      <Swiper
        onSwiper={(s) => setSwiper(s)}
        modules={[HashNavigation]}
        spaceBetween={50}
        slidesPerView={1}
        autoHeight={true}
        initialSlide={0}
        hashNavigation={{
          watchState: true,
          replaceState: true,
        }}
        onSlideChange={(swiper) => setActiveTabIndex(swiper.activeIndex)}
        breakpoints={{
          640: {
            allowTouchMove: false,
          },
        }}
      >
        {TABS.map(({ id, name, component: Component }) => (
          <SwiperSlide
            key={id}
            data-hash={name}
            className="max-sm:min-h-[calc(100vh-250px)]"
          >
            {activeTabIndex === id && (
              <Suspense fallback={<LoadingState />}>
                <ScrollArea className="h-[calc(100vh-250px)] sm:h-[calc(100vh-228px)]">
                  <Component
                    username={username}
                    isActive={activeTabIndex === id}
                  />
                  <ScrollBar />
                </ScrollArea>
              </Suspense>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default StockTabs;
