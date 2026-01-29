import { Separator } from "@/components/ui/separator";
import ProfileDialog from "@/features/wallet/components/ProfileDialog";
import UserAvatar from "@/features/wallet/components/UserAvatar";
import { formatShortINR } from "@/utils/formatters";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

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
          {!!user.portfolio.returnPercent && (
            <div className="text-md flex items-center gap-1">
              {user.portfolio.returnPercent >= 0 ? (
                <TrendingUpIcon className="text-positive size-4 sm:size-5" />
              ) : (
                <TrendingDownIcon className="text-negative size-4 sm:size-5" />
              )}
              <span className="font-medium">
                {user.portfolio.returnPercent.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 border-t pt-3 sm:pt-4">
          <div className="flex text-[0.75rem] sm:text-sm">
            <div className="flex items-center gap-2">
              <span>Funds</span>
              <span className="font-medium tabular-nums">
                {user.portfolio.fundCount}
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="bg-muted-foreground/70 mx-2 rotate-15 data-[orientation=vertical]:h-6 sm:mx-3"
            />
            <div className="flex items-center gap-2">
              <span>SIPs</span>
              <span className="font-medium tabular-nums">
                {user.portfolio.sipCount}
              </span>
            </div>
          </div>
          <div className="ml-auto space-x-2">
            <span className="text-muted-foreground sm:text-2xs text-[0.6rem] uppercase">
              investeds
            </span>
            <span className="ml-auto font-medium tabular-nums sm:text-lg">
              {formatShortINR(user.portfolio.invested)}
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
