import LoadingState from "@/components/LoadingState";
import {
  selectActiveTabIndex,
  setActiveTabIndex,
} from "@/store/slices/mutualFundSlice";
import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { HashNavigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const InvestmentsTab = lazy(() => import("../components/tabs/InvestmentsTab"));
const SipsTab = lazy(() => import("../components/tabs/SipsTab"));
const WatchlistTab = lazy(() => import("../components/tabs/WatchlistTab"));
const ExploreTab = lazy(() => import("../components/tabs/ExploreTab"));

function Page() {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const dispatch = useDispatch();

  return (
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
    >
      <SwiperSlide data-hash="explore" className="min-h-[calc(100vh-200px)]">
        <ExploreTab />
      </SwiperSlide>

      <SwiperSlide
        data-hash="investments"
        className="min-h-[calc(100vh-200px)]"
      >
        {activeTabIndex === 1 && (
          <Suspense fallback={<LoadingState />}>
            <InvestmentsTab />
          </Suspense>
        )}
      </SwiperSlide>

      <SwiperSlide data-hash="sips" className="min-h-[calc(100vh-200px)]">
        {activeTabIndex === 2 && (
          <Suspense fallback={<LoadingState />}>
            <SipsTab />
          </Suspense>
        )}
      </SwiperSlide>

      <SwiperSlide data-hash="watchlist" className="min-h-[calc(100vh-200px)]">
        {activeTabIndex === 3 && (
          <Suspense fallback={<LoadingState />}>
            <WatchlistTab />
          </Suspense>
        )}
      </SwiperSlide>
    </Swiper>
  );
}

export default Page;
