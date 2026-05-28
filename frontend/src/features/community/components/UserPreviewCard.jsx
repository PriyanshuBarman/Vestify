import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRightIcon, ChevronsUpDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";

import { useGetUser } from "@/hooks/useGetUser";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import SendIcon from "@/components/icons/SendIcon";
import UserAvatar from "@/components/UserAvatar";
import ProfileDialog from "@/features/wallet/components/ProfileDialog";
import { formatToShortINR } from "@/utils/formatters";

function UserPreviewCard({ user, isExpanded, onToggle }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { data: self } = useGetUser();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleAvatarClick = (e) => {
    setSelectedUser(user);
    setIsOpen(true);
    e.stopPropagation();
  };

  const profit =
    (user?.portfolio?.current || 0) - (user?.portfolio?.invested || 0);

  return (
    <>
      <Item onClick={onToggle} variant="outline" className="rounded-3xl">
        <ItemMedia className="translate-y-0!">
          <UserAvatar user={user} className="size-11 sm:size-12" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle> {user.name}</ItemTitle>
          <ItemDescription>@{user.username}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="icon-sm" variant="ghost" aria-expanded={isExpanded}>
            <ChevronsUpDownIcon />
          </Button>
        </ItemActions>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden flex flex-col w-full"
            >
              <div className="bg-muted/80 tabular-nums mt-2 grid grid-cols-2 gap-4 sm:gap-6 rounded-2xl px-6 pt-6 pb-4 text-xs sm:grid-cols-3 sm:text-sm">
                <div className="flex gap-2">
                  <span className="text-muted-foreground sm:text-sm text-2xs">
                    Funds :
                  </span>
                  <span className="font-[450]">{user.portfolio.fundCount}</span>
                </div>

                <div className="flex gap-2">
                  <span className="text-muted-foreground sm:text-sm text-2xs">
                    SIPs :
                  </span>
                  <span className="font-[450]">{user.portfolio.sipCount}</span>
                </div>

                <div className="flex gap-2">
                  <span className="text-muted-foreground sm:text-sm text-2xs">
                    Invested :
                  </span>
                  <span className="font-[450]">
                    {formatToShortINR(user.portfolio.invested)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <span className="text-muted-foreground sm:text-sm text-2xs">
                    Current :
                  </span>
                  <span className="font-[450]">
                    {formatToShortINR(user.portfolio.current)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <span className="text-muted-foreground sm:text-sm text-2xs">
                    P/L :
                  </span>
                  <span className="font-[450]">{formatToShortINR(profit)}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-muted-foreground sm:text-sm text-2xs">
                    Return(%) :
                  </span>
                  <span className="font-[450]">
                    {user.portfolio.returnPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="flex col-span-2 sm:col-span-3 flex-wrap gap-2">
                  <span className="text-muted-foreground sm:text-sm text-2xs">
                    Active :
                  </span>
                  <span className="font-[450]">
                    {user.lastActiveAt
                      ? formatDistanceToNow(new Date(user?.lastActiveAt), {
                          addSuffix: true,
                        })
                      : "NA"}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-3 flex gap-2 mt-3 items-center">
                  <Button
                    disabled={
                      user?.userId === "system" || user?.userId === self.id
                    }
                    onClick={handleAvatarClick}
                    size={isMobile ? "sm" : "lg"}
                    variant="ghost"
                    className="rounded-lg hover:bg-background! bg-background shadow-none  font-normal text-xs ml-auto"
                    aria-label="Send money"
                  >
                    <SendIcon />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/community/${user.username}`);
                    }}
                    size={isMobile ? "sm" : "lg"}
                    variant="ghost"
                    className="rounded-lg hover:bg-background! bg-background shadow-none  text-xs flex-1"
                    aria-label="View full profile"
                  >
                    View full profile <ArrowUpRightIcon />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Item>

      <ProfileDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        clickedProfile={selectedUser}
      />
    </>
  );
}

export default UserPreviewCard;
