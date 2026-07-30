import { lazy, Suspense, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LoadingState from "@/components/LoadingState";

import "swiper/css";

import { HashNavigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Tabs from "./Tabs";

const InvestmentsTab = lazy(
  () => import("../../mutual-fund/components/tabs/InvestmentsTab"),
);
const SipsTab = lazy(() => import("../../mutual-fund/components/tabs/SipsTab"));
const WatchlistTab = lazy(
  () => import("../../mutual-fund/components/tabs/WatchlistTab"),
);
const OrdersTab = lazy(() => import("./OrdersTab"));

const TABS = [
  { id: 0, name: "investments", component: InvestmentsTab },
  { id: 1, name: "sips", component: SipsTab },
  { id: 2, name: "watchlist", component: WatchlistTab },
  { id: 3, name: "orders", component: OrdersTab },
];

function MutualFundTabs({ username }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const tabsList = ["Investments", "SIPs", "Watchlist", "Orders"];

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
                  <div className="lg:max-w-lg mx-auto">
                    <Component username={username} />
                  </div>
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

export default MutualFundTabs;
