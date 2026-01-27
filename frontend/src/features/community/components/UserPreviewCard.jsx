import { Separator } from "@/components/ui/separator";
import ProfileDialog from "@/features/wallet/components/ProfileDialog";
import { formatToINR } from "@/utils/formatters";
import { useState } from "react";
import { useNavigate } from "react-router";
import UserAvatar from "@/features/wallet/components/UserAvatar";

function UserPreviewCard({ user }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <>
      <div
        onClick={() => navigate(`/community/${user.username}`)}
        className="bg-card rounded-3xl border p-4 sm:p-6"
      >
        <div className="flex items-center gap-3 sm:gap-5">
          <UserAvatar
            onClick={handleAvatarClick}
            user={user}
            className="size-10 sm:size-12"
          />

          <div className="flex-1">
            <p className="max-sm:text-md font-medium">{user.name}</p>
            <p className="text-muted-foreground text-sm">@{user.username}</p>
          </div>
          {/* <div className="text-md flex items-center gap-1">
            <TrendingUpIcon className="size-4" />
            <span className="font-medium">
              {user.returnPercent}%
            </span>
          </div> */}
        </div>
        <div className="mt-4 flex items-center gap-2 border-t pt-3 sm:pt-4">
          <div className="flex text-[0.8rem]">
            <div className="flex items-center gap-2">
              <span>Funds</span>
              <span className="font-medium tabular-nums">
                {user.portfolioCount || 0}
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="bg-muted-foreground/70 mx-2 rotate-15 data-[orientation=vertical]:h-6 sm:mx-3"
            />
            <div className="flex items-center gap-2">
              <span>SIPs</span>
              <span className="font-medium tabular-nums">
                {user.activeSipCount || 0}
              </span>
            </div>
          </div>
          <div className="ml-auto space-x-2">
            <span className="text-muted-foreground text-[0.7rem] uppercase">
              invested
            </span>
            <span className="ml-auto font-medium tabular-nums">
              {formatToINR(user.totalInvested)}
            </span>
          </div>
        </div>
      </div>
      <ProfileDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        clickedProfile={selectedUser}
      />
    </>
  );
}

export default UserPreviewCard;
