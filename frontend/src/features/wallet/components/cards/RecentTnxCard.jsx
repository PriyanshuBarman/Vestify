import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import { ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useGetAllTnx } from "../../hooks/useGetAllTnx";
import { getLatestTnx } from "../../utils/getLatestTnx";
import TransactionItem from "../TransactionItem";

function RecentTnxCard() {
  const { data: tnxHistory } = useGetAllTnx();
  const navigate = useNavigate();

  const recentTnx = getLatestTnx(tnxHistory, 4);
  return (
    <Card className="mt-10">
      <CardContent>
        <CardHeader className="items-center px-0">
          <CardTitle className="text-md font-medium sm:text-xl sm:font-semibold">
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
            {recentTnx?.map((tnx, index) => (
              <TransactionItem
                key={tnx.id}
                tnx={tnx}
                index={index}
                length={recentTnx.length}
              />
            ))}
          </ItemGroup>
        ) : (
          <>
            <img
              src="notebook-glass.svg"
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
