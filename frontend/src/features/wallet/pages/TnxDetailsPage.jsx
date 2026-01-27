import CopyButton from "@/components/CopyButton";
import GoBackBar from "@/components/GoBackBar";
import IncognitoIcon from "@/components/icons/IncognitoIcon";
import SendIcon from "@/components/icons/SendIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatToINR } from "@/utils/formatters";
import { formatDate } from "date-fns";
import { MoveDownLeftIcon, MoveUpRightIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ProfileDialog from "../components/ProfileDialog";
import { assetConfig } from "../utils/constants";

function TnxDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const tnx = location.state;
  const isCredit = tnx.type === "CREDIT";
  const assetInfo = assetConfig[tnx.assetCategory];
  const peerProfile = tnx.peerUser?.profile;

  const displayData = {
    avatar: peerProfile?.avatar || assetInfo?.img,
    fallback: peerProfile?.name?.charAt(0) || tnx.assetCategory?.charAt(0),
    name: peerProfile?.name || assetInfo?.name || "Deleted account",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [clickedProfile, setclickedProfile] = useState();

  const handleAvatarClick = () => {
    if (!peerProfile) return;
    setclickedProfile(peerProfile);
    setIsOpen(true);
  };

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar
        title="Transaction Details"
        showSearchIcon={false}
        className="px-0"
      />

      <div className="mt-6 flex flex-col items-center gap-6">
        <div className="bg-primary ring-primary/50 w-fit rounded-full ring-6">
          {isCredit ? (
            <MoveDownLeftIcon className="text-background m-auto size-18 p-5" />
          ) : (
            <MoveUpRightIcon className="text-background m-auto size-18 p-5" />
          )}
        </div>

        <div className="space-y-2 text-center">
          <p className="text-2xl font-medium">
            {isCredit ? "" : "-"} {formatToINR(tnx.amount)}
          </p>
          {tnx.note && (
            <Badge variant="secondary" className="px-4 py-2 text-xs">
              {tnx.note}
            </Badge>
          )}
        </div>
      </div>

      <Card className="mt-6 w-full rounded-3xl py-4">
        <CardContent className="flex flex-row justify-between text-sm">
          <span className="flex items-center gap-2 font-medium">
            {isCredit ? "Received from" : "Sent to"}
          </span>
          <div className="flex max-w-1/2 flex-wrap items-center justify-center gap-2">
            <span className="text-center text-wrap capitalize">
              {displayData.name}
            </span>
            <Button
              size="icon"
              className="text-foreground bg-transparent"
              onClick={handleAvatarClick}
            >
              <Avatar className="size-9">
                <AvatarImage src={displayData.avatar} />
                <AvatarFallback className="text-sm uppercase">
                  {displayData.fallback || <IncognitoIcon className="size-5" />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </CardContent>
      </Card>

      <TnxDetailsCard tnx={tnx} />

      {peerProfile && peerProfile?.userId !== "system" && (
        <>
          <Button
            size="lg"
            className="mx-auto mt-auto w-full sm:mt-14 sm:w-fit"
            onClick={() => {
              navigate(`/wallet/send`, {
                state: {
                  receiverId: peerProfile.userId,
                  receiverName: peerProfile.name,
                  receiverUsername: peerProfile.username,
                  receiverAvatar: peerProfile.avatar,
                },
              });
            }}
          >
            <SendIcon />
            Send Again
          </Button>
        </>
      )}
      <ProfileDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        clickedProfile={clickedProfile}
      />
    </div>
  );
}

export default TnxDetailsPage;

function TnxDetailsCard({ tnx }) {
  return (
    <Card className="my-6 w-full rounded-3xl">
      <CardContent className="space-y-6 text-sm">
        <CardHeader>
          <CardTitle className="text-md text-center font-medium">
            Transaction details{" "}
          </CardTitle>
        </CardHeader>

        <div className="flex items-center justify-between">
          <span>Updated balance</span>
          <span className="max-w-1/2 font-medium">
            {formatToINR(tnx.updatedBalance)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Time</span>
          <span className="max-w-1/2 font-medium">
            {formatDate(tnx.createdAt, "h:mm a")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Date</span>
          <span className="max-w-1/2 font-medium">
            {formatDate(tnx.createdAt, "dd MMM yy")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Transaction Id</span>
          <div className="flex max-w-1/2 flex-wrap items-center font-medium break-all">
            <span>{tnx.id}</span>
            <CopyButton text={tnx.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
