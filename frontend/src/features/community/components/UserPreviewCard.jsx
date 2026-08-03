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
import { formatToINR } from "@/utils/formatters";

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

  const stockCount = user?.stockPortfolio?.stockCount || 0;
  const mfFundCount = user?.mfPortfolio?.fundCount || 0;

  return (
    <>
      <Item onClick={onToggle} variant="outline" className="rounded-3xl pb-3">
        <ItemMedia className="translate-y-0!">
          <UserAvatar user={user} className="size-11 sm:size-12" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="max-w-[20ch] truncate">{user.name}</ItemTitle>
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
              className="w-full"
            >
              <div className=" flex bg-muted/80 px-6 pt-6 pb-4 rounded-2xl flex-col w-full">
                <section className="tabular-nums grid grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground sm:text-sm text-2xs">
                      Total Stocks :
                    </span>
                    <span className="font-[450]">{stockCount}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-muted-foreground sm:text-sm text-2xs">
                      Total Mutual Funds :
                    </span>
                    <span className="font-[450]">{mfFundCount}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground sm:text-sm text-2xs">
                      Balance :
                    </span>
                    <span className="font-[450]">
                      {formatToINR(user.balance)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
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
                </section>

                {/* Action Buttons */}
                <div className="flex  gap-2 mt-6 items-center">
                  <Button
                    disabled={
                      user?.userId === "system" || user?.userId === self?.id
                    }
                    onClick={handleAvatarClick}
                    size={isMobile ? "sm" : "lg"}
                    variant="ghost"
                    className="rounded-lg hover:bg-background! bg-background shadow-none text-xs ml-auto"
                    aria-label="Send money"
                  >
                    <SendIcon />
                    Pay
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/community/${user.username}`);
                    }}
                    size={isMobile ? "sm" : "lg"}
                    variant="ghost"
                    className="rounded-lg hover:bg-background! bg-background shadow-none text-xs flex-1"
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
