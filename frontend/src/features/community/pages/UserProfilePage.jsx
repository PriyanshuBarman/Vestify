import { useState } from "react";
import { useParams } from "react-router";

import FeatureSwitcher from "../components/FeatureSwitcher";
import MutualFundTabs from "../components/MutualFundTabs";
import ProfileHeader from "../components/ProfileHeader";
import StockTabs from "../components/StockTabs";
import { useUserProfile } from "../hooks/useUserProfile";

function UserProfilePage() {
  const { username } = useParams();
  const [activeFeature, setActiveFeature] = useState("stocks");

  const { data: profile } = useUserProfile(username);

  return (
    <div className="sm:mx-auto sm:max-w-6xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Profile Header */}
        <div className="bg-background max-sm:sticky max-sm:top-0 lg:w-1/3 lg:shrink-0">
          <ProfileHeader profile={profile} />
        </div>

        {/* Right Side: Feature Switcher and Tabs Content */}
        <div className="sm:h-[calc(100vh-100px)] lg:border-l lg:pl-8 lg:w-2/3">
          <FeatureSwitcher
            activeFeature={activeFeature}
            onSelect={setActiveFeature}
          />

          {/* Conditional Rendering of Feature Tabs */}
          {activeFeature === "mutual-funds" ? (
            <MutualFundTabs username={username} />
          ) : (
            <StockTabs username={username} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
