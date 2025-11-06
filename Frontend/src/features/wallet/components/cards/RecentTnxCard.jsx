import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { formatToINR } from "@/utils/formatters";
import { formatDate } from "date-fns";
import { ChevronRightIcon } from "lucide-react";
import { Fragment } from "react";
import { useGetAllTnx } from "../../hooks/useGetAllTnx";
import { assetConfig } from "../../utils/constants";
import { getLatestTnx } from "../../utils/getLatestTnx";
import { useNavigate } from "react-router";
import TransactionItem from "../TransactionItem";

function RecentTnxCard() {
  const { data: tnxHistory } = useGetAllTnx();
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <CardHeader className="items-center px-0">
          <CardTitle className="font-medium text-md sm:text-xl sm:font-semibold">
            Recent Transactions
          </CardTitle>
          <CardAction className="row-span-1">
            <Button
              disabled={!tnxHistory || tnxHistory.length === 0}
              variant="icon"
              className="bg-accent size-6 rounded-full"
              onClick={() => navigate("/wallet/transactions")}
            >
              <ChevronRightIcon />
            </Button>
          </CardAction>
        </CardHeader>

        {tnxHistory ? (
          <ItemGroup className="mt-2">
            {getLatestTnx(tnxHistory, 5)?.map((tnx, index, array) => (
              <Fragment key={tnx.id}>
                <TransactionItem tnx={tnx} />
                {index !== array.length - 1 && <ItemSeparator />}
              </Fragment>
            ))}
          </ItemGroup>
        ) : (
          <>
            <img
              src="Notebook-bro.svg"
              alt=""
              className="mx-auto size-40 sm:size-60"
            />
            <p className="mt-2 text-center text-sm font-medium sm:text-base">
              No Recent Transactions
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
export default RecentTnxCard;

// function TransactionItem({ tnx }) {
//   return (
//     <Item className="cursor-pointer px-0">
//       <ItemMedia>
//         <Avatar className="size-9">
//           <AvatarImage
//             src={
//               tnx.peerUser?.profile?.avatar ||
//               assetConfig[tnx.assetCategory]?.img
//             }
//           />
//           <AvatarFallback className="text-sm uppercase">
//             {tnx.peerUser?.profile?.name?.charAt(0) ||
//               tnx.assetCategory?.charAt(0)}
//           </AvatarFallback>
//         </Avatar>
//       </ItemMedia>
//       <ItemContent>
//         <ItemTitle className="capitalize">
//           {tnx.peerUser?.profile?.name || assetConfig[tnx.assetCategory]?.name}
//         </ItemTitle>
//         <ItemDescription className="text-xs">
//           {formatDate(tnx.createdAt, "dd MMM, h:mm a")}
//         </ItemDescription>
//       </ItemContent>
//       <div className="flex flex-col items-end gap-1.5">
//         <div
//           className={`${tnx.type === "CREDIT" && "text-positive"} text-sm font-[550] tabular-nums`}
//         >
//           <span className="mr-0.5">{tnx.type === "CREDIT" ? "+" : "-"}</span>
//           {formatToINR(tnx.amount)}
//         </div>
//         <div className="text-muted-foreground text-xs">
//           Bal. {formatToINR(tnx.updatedBalance)}
//         </div>
//       </div>
//     </Item>
//   );
// }
