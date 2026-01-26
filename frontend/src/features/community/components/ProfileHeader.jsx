import GoBackBar from "@/components/GoBackBar";
import ProfileDialog from "@/features/wallet/components/ProfileDialog";
import UserAvatar from "@/features/wallet/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

function ProfileHeader({ profile }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAvatarClick = (e) => {
    setIsOpen(true);
  };

  if (!profile) return null;

  return (
    <div className="flex w-full flex-col items-center gap-4 pb-6 text-center">
      <GoBackBar className="w-full" showSearchIcon={false} />
      <UserAvatar
        onClick={handleAvatarClick}
        user={profile}
        className="size-24 lg:size-34"
      />

      <div className="space-y-1 lg:mt-2 lg:space-y-2">
        <h1 className="text-2xl font-semibold lg:text-2xl">{profile.name}</h1>
        <p className="text-muted-foreground max-sm:text-sm">
          @{profile.username}
        </p>

        {profile.lastActiveAt && (
          <p className="text-muted-foreground/60 text-xs sm:text-sm">
            Active{" "}
            {formatDistanceToNow(new Date(profile.lastActiveAt), {
              addSuffix: true,
            })}
          </p>
        )}
      </div>
      <ProfileDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        clickedProfile={profile}
      />
    </div>
  );
}

export default ProfileHeader;
