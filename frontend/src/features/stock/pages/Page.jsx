import { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActiveTabIndex } from "@/store/slices/stockSlice";

import "swiper/css";

import { HashNavigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { selectActiveTabIndex } from "@/store/slices/stockSlice";

import Indices from "../components/Indices";
import Tabs from "../components/Tabs";
import HoldingsTab from "../components/tabs/HoldingsTab";
import PositionsTab from "../components/tabs/PositionsTab";

const WatchlistTab = lazy(() => import("../components/tabs/WatchlistTab"));
const ExploreTab = lazy(() => import("../components/tabs/ExploreTab"));

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
    name: "positions",
    component: PositionsTab,
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
            className="min-h-[calc(100vh-200px)]"
          >
            <Component />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Page;
