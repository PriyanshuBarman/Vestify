import LoadingState from "@/components/LoadingState";
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

function ProfilePage() {
  const { username } = useParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const { data: profile, isPending } = useUserProfile(username);

  if (isPending) return <LoadingState fullPage />;
  if (!profile)
    return (
      <div className="text-muted-foreground p-8 text-center">
        User not found
      </div>
    );

  return (
    <div className="sm:mx-auto sm:max-w-6xl">
      <div className="flex flex-col lg:flex-row lg:items-center">
        {/* Left Side: Profile Header */}
        <div className="lg:w-1/3 lg:shrink-0">
          <ProfileHeader profile={profile} />
        </div>

        {/* Right Side: Tabs and Content */}
        <div className="scrollbar-none sm:h-[calc(100vh-100px)] sm:overflow-x-hidden sm:overflow-y-auto">
          <Tabs swiper={swiper} activeTabIndex={activeTabIndex} />

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
              className="max-sm:min-h-[calc(100vh-200px)]"
            >
              {activeTabIndex === 0 && <InvestmentsTab username={username} />}
            </SwiperSlide>

            <SwiperSlide
              data-hash="sips"
              className="max-sm:min-h-[calc(100vh-200px)]"
            >
              {activeTabIndex === 1 && (
                <Suspense fallback={<LoadingState />}>
                  <SipsTab username={username} />
                </Suspense>
              )}
            </SwiperSlide>

            <SwiperSlide
              data-hash="watchlist"
              className="max-sm:min-h-[calc(100vh-200px)]"
            >
              {activeTabIndex === 2 && (
                <Suspense fallback={<LoadingState />}>
                  <WatchlistTab username={username} />
                </Suspense>
              )}
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
