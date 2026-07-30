import { useState } from "react";
import { formatDate } from "date-fns";
import { Link } from "react-router";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";

import { assetConfig } from "../utils/constants";
import { getTransactionTitle } from "../utils/helpers";
import ProfileDialog from "./ProfileDialog";
import TransactionAvatar from "./TransactionAvatar";

function TransactionItem({ tnx, index, length, hideSeparator }) {
  const peerProfile = tnx.peerUser?.profile;
  const assetInfo = assetConfig[tnx.assetCategory];
  const title = getTransactionTitle(tnx, peerProfile, assetInfo);

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
            <TransactionAvatar
              tnx={tnx}
              peerProfile={peerProfile}
              assetInfo={assetInfo}
              onClick={handleAvatarClick}
            />
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="capitalize line-clamp-1">{title}</ItemTitle>
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
