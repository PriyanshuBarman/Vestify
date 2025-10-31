import GoBackBar from "@/components/GoBackBar";
import ShareIcon from "@/components/icons/ShareIcon";
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
import { useGetUser } from "@/hooks/useGetUser";
import { GiftIcon, TrophyIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";
const shareText = `Try *Vestify* — 
a virtual investment platform with a *Groww-like UI*.

Invest in mutual funds using virtual money, _start virtual SIPs_, manage your virtual wallet, and track portfolio

— all without any market risk.

`;

function ReferAndEarnPage() {
  const { data: user = {} } = useGetUser();

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        text: shareText,
        url: `${window.location.origin}/auth/signup?referralCode=${user.profile.username}`,
      });
    } else {
      toast.info("Not supported");
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-12 px-4 pb-12 sm:px-6 lg:px-8">
      <GoBackBar
        showSearchIcon={false}
        className="bg-transparent px-0 backdrop-blur-[2px]"
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
          <h3 className="text-primary text-3xl font-bold">₹10,000</h3>
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
              You will get ₹10,000 and your friend will get ₹5,000 in virtual
              wallet.
            </p>
          </div>
          <CardFooter className="bg-accent mt-8 rounded-md px-4 py-2">
            <CardDescription className="text-xs">
              Note: It's virtual money and will be credited to your vestify
              wallet. <b>It's not real money.</b>
            </CardDescription>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReferAndEarnPage;
