import IncognitoIcon from "@/components/icons/IncognitoIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";
import { formatDate } from "date-fns";
import { assetConfig } from "../utils/constants";
import ProfileDialog from "./ProfileDialog";
import { useState } from "react";
import { Link } from "react-router";

function TransactionItem({ tnx, index, length, hideSeparator }) {
  const peerProfile = tnx.peerUser?.profile;
  const assetInfo = assetConfig[tnx.assetCategory];

  const displayData = {
    avatar: peerProfile?.avatar || assetInfo?.img,
    fallback: peerProfile?.name?.charAt(0) || tnx.assetCategory?.charAt(0),
    name: peerProfile?.name || assetInfo?.name || "Deleted account",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [clickedProfile, setclickedProfile] = useState();

  const handleAvatarClick = (e) => {
    e.preventDefault();
    if (!peerProfile) return;
    setclickedProfile(peerProfile);
    setIsOpen(true);
  };

  return (
    <>
      <Item asChild size="sm" className="cursor-pointer px-0">
        <Link to="/wallet/tnx-details" state={tnx}>
          <ItemMedia>
            <Avatar onClick={handleAvatarClick} className="size-9">
              <AvatarImage src={displayData.avatar} />
              <AvatarFallback className="text-sm uppercase">
                {displayData.fallback || <IncognitoIcon className="size-5" />}
              </AvatarFallback>
            </Avatar>
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="capitalize">{displayData.name}</ItemTitle>
            <ItemDescription className="text-xs">
              {formatDate(tnx.createdAt, "dd MMM, h:mm a")}
            </ItemDescription>
          </ItemContent>

          <div className="flex flex-col items-end gap-1.5">
            <div
              className={`${tnx.type === "CREDIT" && "text-positive"} text-sm font-[550] tabular-nums`}
            >
              <span className="mr-0.5">
                {tnx.type === "CREDIT" ? "+" : "-"}
              </span>
              {formatToINR(tnx.amount)}
            </div>
            <div className="text-muted-foreground text-xs">
              Bal. {formatToINR(tnx.updatedBalance)}
            </div>
          </div>
        </Link>
      </Item>
      {!hideSeparator && index !== length - 1 && <ItemSeparator />}

      <ProfileDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        clickedProfile={clickedProfile}
      />
    </>
  );
}

export default TransactionItem;
