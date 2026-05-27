import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import { useGetUser } from "@/hooks/useGetUser";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import GoBackBar from "@/components/GoBackBar";
import ProfileDialog from "@/features/wallet/components/ProfileDialog";

function ProfileHeader({ profile }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: self } = useGetUser();
  const isSelf = profile?.userId === self.id;

  const handleAvatarClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full pb-6 text-center">
      <GoBackBar className="w-full" showSearchIcon={false} />
      <div className="flex items-center justify-center gap-6 px-4 lg:flex-col">
        <Avatar
          onClick={handleAvatarClick}
          className={cn("size-20 lg:size-34 overflow-visible")}
        >
          <AvatarImage src={profile?.avatar} className="rounded-full" />
          <AvatarFallback className="text-3xl sm:text-4xl sm:font-medium">
            {profile?.name?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
          {isSelf && (
            <AvatarBadge
              className="right-1 bottom-1.5
             lg:right-4 bottom- size-3! lg:size-4!"
            />
          )}
        </Avatar>

        <div className="mt-2 space-y-1 text-start max-sm:max-w-1/2 sm:text-center lg:space-y-2">
          <h1 className="line-clamp-2 text-lg font-semibold lg:text-2xl">
            {profile?.name}
          </h1>
          <p className="text-muted-foreground/80 line-clamp-2 max-sm:text-xs">
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
