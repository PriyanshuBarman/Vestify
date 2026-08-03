import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingState from "@/components/LoadingState";
import { setActiveTabIndex } from "@/store/slices/stockSlice";

import "swiper/css";

import { HashNavigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { selectActiveTabIndex } from "@/store/slices/stockSlice";

import Indices from "../components/Indices";
import Tabs from "../components/Tabs";
import ExploreTab from "../components/tabs/ExploreTab";
import HoldingsTab from "../components/tabs/HoldingsTab";
import OrdersTab from "../components/tabs/OrdersTab";

const WatchlistTab = lazy(() => import("../components/tabs/WatchlistTab"));

const TABS = [
  {
    id: 0,
    name: "explore",
    component: ExploreTab,
  },
  {
    id: 1,
    name: "holdings",
    component: HoldingsTab,
  },
  {
    id: 2,
    name: "orders",
    component: OrdersTab,
  },
  {
    id: 3,
    name: "watchlist",
    component: WatchlistTab,
  },
];

function Page() {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const dispatch = useDispatch();

  return (
    <div>
      <Indices />
      <Tabs />
      <Swiper
        modules={[HashNavigation]}
        spaceBetween={50}
        slidesPerView={1}
        autoHeight={true}
        hashNavigation={{
          watchState: true,
          replaceState: true,
        }}
        onSlideChange={(swiper) =>
          dispatch(setActiveTabIndex(swiper.activeIndex))
        }
        breakpoints={{
          640: {
            allowTouchMove: false,
          },
        }}
        initialSlide={activeTabIndex}
      >
        {TABS.map(({ id, name, component: Component }) => (
          <SwiperSlide
            key={id}
            data-hash={name}
            className="min-h-[calc(100vh-300px)] pb-18"
          >
            <Suspense fallback={<LoadingState />}>
              <Component isActive={activeTabIndex === id} />
            </Suspense>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Page;
