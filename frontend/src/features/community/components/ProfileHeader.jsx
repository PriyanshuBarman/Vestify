import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileDialog from "@/features/wallet/components/ProfileDialog";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

function ProfileHeader({ profile }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAvatarClick = (e) => {
    setIsOpen(true);
  };

  return (
    <div className="w-full pb-6 text-center">
      <GoBackBar className="w-full" showSearchIcon={false} />
      <div className="flex items-center justify-center gap-6 lg:flex-col">
        <Avatar onClick={handleAvatarClick} className="size-24 lg:size-34">
          <AvatarImage src={profile?.avatar} />
          <AvatarFallback>
            {profile?.name?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="mt-2 space-y-1 text-start sm:text-center lg:space-y-2">
          <h1 className="text-xl font-semibold lg:text-2xl">{profile?.name}</h1>
          <p className="text-muted-foreground/80 max-sm:text-xs">
            @{profile?.username}
          </p>

          {profile?.lastActiveAt && (
            <p className="text-muted-foreground/60 text-xs sm:text-sm">
              Active{" "}
              {formatDistanceToNow(new Date(profile?.lastActiveAt), {
                addSuffix: true,
              })}
            </p>
          )}
        </div>
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
