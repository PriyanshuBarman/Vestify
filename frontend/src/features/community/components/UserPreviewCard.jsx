import ProfileDialog from "@/features/wallet/components/ProfileDialog";
import { formatToINR } from "@/utils/formatters";
import { useState } from "react";
import { useNavigate } from "react-router";
import UserAvatar from "../../wallet/components/UserAvatar";

function UserPreviewCard({ user }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <div
        onClick={() => navigate(`/community/${user.username}`)}
        className="bg-card hover:bg-accent/50 flex flex-col gap-4 rounded-3xl border p-4 transition-colors sm:px-5 sm:pt-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar
              onClick={handleAvatarClick}
              user={user}
              className="size-9.5 sm:size-10"
            />
            <div>
              <h3 className="text-md font-medium sm:text-base">{user.name}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                @{user.username}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-muted-foreground text-xs ">
              Invested
            </p>
            <p className="text-base font-medium sm:font-semibold tabular-nums sm:text-lg">
              {formatToINR(user.totalInvested)}
            </p>
          </div>
        </div>

        <div className="border-border/50 flex items-center gap-6 border-t pt-2 sm:pt-3">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[0.7rem] tracking-wider sm:font-medium">
              Funds
            </span>
            <span className="text-foreground/90 text-xs sm:font-semibold">
              {user.portfolioCount || 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[0.7rem] tracking-wider sm:font-medium">
              SIPs
            </span>
            <span className="text-foreground/90 text-xs sm:font-medium">
              {user.activeSipCount || 0}
            </span>
          </div>
        </div>
      </div>

      <ProfileDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        clickedProfile={user}
      />
    </>
  );
}

export default UserPreviewCard;
