import LoadingState from "@/components/LoadingState";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePrefetchRequiredQueries } from "@/features/mutual-fund/hooks/usePrefetchRequiredQueries";
import { lazy, Suspense, useState } from "react";
import { useParams } from "react-router";
import "swiper/css";
import { HashNavigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import InvestmentsTab from "../../mutual-fund/components/tabs/InvestmentsTab";
import ProfileHeader from "../components/ProfileHeader";
import Tabs from "../components/Tabs";
import { useUserProfile } from "../hooks/useUserProfile";

const SipsTab = lazy(() => import("../../mutual-fund/components/tabs/SipsTab"));
const WatchlistTab = lazy(
  () => import("../../mutual-fund/components/tabs/WatchlistTab"),
);
const OrdersTab = lazy(() => import("../components/OrdersTab"));

function UserProfilePage() {
  const { username } = useParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const { data: profile } = useUserProfile(username);
 
  usePrefetchRequiredQueries(username);

  return (
    <div className="sm:mx-auto sm:max-w-6xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Profile Header */}
        <div className="bg-background z-50 max-sm:sticky max-sm:top-0 lg:w-1/3 lg:shrink-0">
          <ProfileHeader profile={profile} />
        </div>

        {/* Right Side: Tabs and Content */}
        <div className="sm:h-[calc(100vh-100px)] lg:w-1/2">
          <Tabs
            swiper={swiper}
            activeTabIndex={activeTabIndex}
            className="max-sm:sticky max-sm:top-[168px]"
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
            <SwiperSlide
              data-hash="investments"
              className="max-sm:min-h-[calc(100vh-250px)]"
            >
              {activeTabIndex === 0 && (
                <ScrollArea className="h-[calc(100vh-250px)] sm:h-[calc(100vh-164px)]">
                  <InvestmentsTab username={username} />
                  <ScrollBar />
                </ScrollArea>
              )}
            </SwiperSlide>

            <SwiperSlide
              data-hash="sips"
              className="max-sm:min-h-[calc(100vh-250px)]"
            >
              {activeTabIndex === 1 && (
                <Suspense fallback={<LoadingState />}>
                  <ScrollArea className="h-[calc(100vh-250px)] sm:h-[calc(100vh-164px)]">
                    <SipsTab username={username} />
                    <ScrollBar />
                  </ScrollArea>
                </Suspense>
              )}
            </SwiperSlide>

            <SwiperSlide
              data-hash="watchlist"
              className="max-sm:min-h-[calc(100vh-250px)]"
            >
              {activeTabIndex === 2 && (
                <Suspense fallback={<LoadingState />}>
                  <ScrollArea className="h-[calc(100vh-250px)] sm:h-[calc(100vh-164px)]">
                    <WatchlistTab username={username} />
                    <ScrollBar />
                  </ScrollArea>
                </Suspense>
              )}
            </SwiperSlide>

            <SwiperSlide
              data-hash="orders"
              className="max-sm:min-h-[calc(100vh-250px)]"
            >
              {activeTabIndex === 3 && (
                <Suspense fallback={<LoadingState />}>
                  <ScrollArea className="h-[calc(100vh-250px)] sm:h-[calc(100vh-164px)]">
                    <OrdersTab username={username} />
                    <ScrollBar />
                  </ScrollArea>
                </Suspense>
              )}
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
