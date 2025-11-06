import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";
import { formatDate } from "date-fns";
import { assetConfig } from "../utils/constants";
import { cn } from "@/lib/utils";

function TransactionItem({ tnx, className }) {
  return (
    <Item size="sm" className={cn("cursor-pointer px-0", className)}>
      <ItemMedia>
        <Avatar className="size-9">
          <AvatarImage
            src={
              tnx.peerUser?.profile?.avatar ||
              assetConfig[tnx.assetCategory]?.img
            }
          />
          <AvatarFallback className="text-sm uppercase">
            {tnx.peerUser?.profile?.name?.charAt(0) ||
              tnx.assetCategory?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="capitalize">
          {tnx.peerUser?.profile?.name || assetConfig[tnx.assetCategory]?.name}
        </ItemTitle>
        <ItemDescription className="text-xs">
          {formatDate(tnx.createdAt, "dd MMM, h:mm a")}
        </ItemDescription>
      </ItemContent>

      <div className="flex flex-col items-end gap-1.5">
        <div
          className={`${tnx.type === "CREDIT" && "text-positive"} text-sm font-[550] tabular-nums`}
        >
          <span className="mr-0.5">{tnx.type === "CREDIT" ? "+" : "-"}</span>
          {formatToINR(tnx.amount)}
        </div>
        <div className="text-muted-foreground text-xs">
          Bal. {formatToINR(tnx.updatedBalance)}
        </div>
      </div>
    </Item>
  );
}

export default TransactionItem;
