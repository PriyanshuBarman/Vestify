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
    setSelectedUser(user);
    setIsOpen(true);
    e.stopPropagation();
  };

  return (
    <>
      <div
        onClick={() => navigate(`/community/${user.username}`)}
        className="bg-card rounded-4xl border"
      >
        <div className="flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
          <UserAvatar
            onClick={handleAvatarClick}
            user={user}
            className="size-11 sm:size-12"
          />

          <div className="flex-1">
            <p className="text-md font-medium sm:text-base">{user.name}</p>
            <p className="text-muted-foreground text-sm sm:mt-0.5">
              @{user.username}
            </p>
          </div>
          {!!user.portfolio.returnPercent && (
            <div className="text-md flex items-center gap-2 sm:text-base">
              {user.portfolio.returnPercent >= 0 ? (
                <TrendingUpIcon className="text-positive size-4 sm:size-5" />
              ) : (
                <TrendingDownIcon className="text-negative size-4 sm:size-5" />
              )}
              <span className="font-medium sm:text-[1.0625rem]">
                {user.portfolio.returnPercent.toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        <div className="bg-muted/80 m-2 flex h-15 items-center justify-around rounded-3xl text-sm tabular-nums sm:h-16">
          <div className="flex flex-col items-center sm:gap-1">
            <span className="text-muted-foreground text-[0.725rem]">Funds</span>
            <span className="text-md">
              {user.portfolio.fundCount}
            </span>
          </div>
          <div className="flex flex-col items-center sm:gap-1">
            <span className="text-muted-foreground text-[0.725rem]">SIPs</span>
            <span className="text-md">
              {user.portfolio.sipCount}
            </span>
          </div>
          <div className="flex flex-col items-center sm:gap-1">
            <span className="text-muted-foreground text-[0.725rem]">
              Invested
            </span>
            <span className="text-md">
              {formatShortINR(user.portfolio.invested)}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-muted-foreground text-xs">Current</span>
            <span className="text-md">
              {formatShortINR(user.portfolio.current)}
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
