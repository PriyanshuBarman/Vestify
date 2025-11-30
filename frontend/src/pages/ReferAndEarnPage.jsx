import GoBackBar from "@/components/GoBackBar";
import ShareIcon from "@/components/icons/ShareIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  VITE_REFERRED_USER_REWARD_AMOUNT,
  VITE_REFERRER_REWARD_AMOUNT,
} from "@/config/env";
import { useGetReferrals } from "@/hooks/useGetReferrals";
import { useGetUser } from "@/hooks/useGetUser";
import { formatToINR } from "@/utils/formatters";
import {
  CheckCircle2Icon,
  GiftIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { Fragment } from "react";
import { toast } from "sonner";

const shareText = `*Virtually Invest in Mutual funds* with a *Groww app UI*.

Invest, start SIPs, track portfolio, use a virtual wallet, send your virtual money to others and more.
— all virtually with a Groww app UI.

`;

function ReferAndEarnPage() {
  const { data: user } = useGetUser();
  const { data: referrals } = useGetReferrals();
  const REFERRER_REWARD = formatToINR(VITE_REFERRER_REWARD_AMOUNT);
  const REFERRED_USER_REWARD = formatToINR(VITE_REFERRED_USER_REWARD_AMOUNT);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        text: shareText,
        url: `${window.location.origin}?referralCode=${user.profile.username}`,
      });
    } else {
      toast.info("Not supported");
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-12 px-4 pb-12 sm:px-6 lg:px-8">
      <GoBackBar
        showSearchIcon={false}
        className="bg-transparent px-0 backdrop-blur-[1px]"
      />
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Refer & Earn
        </h1>
        <p className="text-muted-foreground mt-4 px-4 sm:text-xl">
          Share the love for Vestify and get rewarded. It's a win-win!
        </p>
      </div>

      <Card className="relative">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GiftIcon className="h-6 w-6" />
            Referral Reward
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <h3 className="text-primary text-3xl font-bold">{REFERRER_REWARD}</h3>
          <TrophyIcon className="text-muted absolute right-6 bottom-6 size-20 rotate-12" />
        </CardContent>
      </Card>

      <Button className="w-full rounded-full" onClick={handleShare}>
        <ShareIcon />
        Share Link
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-6 w-6" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm sm:text-base">
          <div className="flex items-start gap-4">
            <Badge className="size-6 rounded-full">1</Badge>
            <p className="text-muted-foreground flex-1">
              Share your unique referral link with friends and family.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <Badge className="size-6 rounded-full">2</Badge>
            <p className="text-muted-foreground flex-1">
              Your friend signs up on Vestify using your link.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <Badge className="size-6 rounded-full">3</Badge>
            <p className="text-muted-foreground flex-1">
              You will get {REFERRER_REWARD} and your friend will get{" "}
              {REFERRED_USER_REWARD} in virtual wallet.
            </p>
          </div>
          <CardFooter className="mt-8 rounded-md px-4 py-2">
            <CardDescription className="text-xs">
              Note: It's virtual money and will be credited to your vestify
              wallet. <b>It's not real money.</b>
            </CardDescription>
          </CardFooter>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2Icon className="h-6 w-6" />
            Your Referrals
          </CardTitle>
          <CardDescription>
            Successful referrals: <b>{referrals?.length || 0}</b>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!referrals || referrals.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center justify-center py-12 text-center">
              <UsersIcon className="mb-4 h-16 w-16 opacity-20" />
              <p className="text-lg font-medium">No referrals yet</p>
              <p className="mt-2 text-sm">
                Share your referral link to start earning rewards!
              </p>
            </div>
          ) : (
            <ItemGroup className="gap-2">
              {referrals?.map((item, index) => (
                <Fragment key={item.id}>
                  <Item size="sm" className="p-2">
                    <ItemMedia>
                      <Avatar className="size-10">
                        <AvatarImage src={item.referredUser.profile.avatar} />
                        <AvatarFallback>
                          {item.referredUser.profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{item.referredUser.profile.name}</ItemTitle>
                      <ItemDescription>
                        @{item.referredUser.profile.username}
                      </ItemDescription>
                    </ItemContent>
                    <div>
                      <span className="text-primary font-medium">
                        +{formatToINR(item.amount)}
                      </span>
                    </div>
                  </Item>
                  {index !== referrals.length - 1 && <ItemSeparator />}
                </Fragment>
              ))}
            </ItemGroup>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ReferAndEarnPage;
