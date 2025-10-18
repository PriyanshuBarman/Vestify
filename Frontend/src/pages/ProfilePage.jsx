import ProfileAvatar from "@/components/ProfileAvatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useGetUser } from "@/hooks/useGetUser";
import NumberFlow from "@number-flow/react";
import {
  ArrowLeftIcon,
  ArrowLeftRightIcon,
  HeartIcon,
  LogsIcon,
  SettingsIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const NAV_ITEMS = [
  {
    to: "/orders",
    icon: <LogsIcon className="text-muted-foreground" />,
    text: "Orders",
  },
  {
    to: "/account-details",
    icon: <UserIcon className="text-muted-foreground" />,
    text: "Account Details",
  },
  {
    to: "/wallet/transactions",
    icon: <ArrowLeftRightIcon className="text-muted-foreground" />,
    text: "Transactions",
  },
  {
    to: "/settings",
    icon: <SettingsIcon className="text-muted-foreground" />,
    text: "Settings",
  },
  {
    to: "#",
    icon: <HeartIcon className="text-muted-foreground" />,
    text: "Refer & earn",
  },
];

function ProfilePage() {
  const navigate = useNavigate();

  const { data: user = {} } = useGetUser();
  const { data: balance } = useGetBalance();

  return (
    <div className="flex h-dvh flex-col sm:min-w-md sm:rounded-l-2xl sm:pl-6">
      <div className="sticky top-0 z-10 p-4 sm:hidden">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => navigate("/settings")}
          >
            <SettingsIcon className="size-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {/* Profile Info */}
        <div>
          <ProfileAvatar className="mx-auto" />

          <h3 className="mt-2 text-center font-semibold capitalize">
            {user.profile?.name}
          </h3>
          <p className="text-muted-foreground text-center text-sm">
            @{user.profile?.username}
          </p>
        </div>

        <Separator className="mt-8" />

        {/* Nav Items */}
        <div className="ml-4 text-[0.94rem] font-medium">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <WalletIcon className="text-muted-foreground" />
            <span className="border-b py-4">
              <NumberFlow value={balance || 0} prefix="₹" />
            </span>
          </div>

          {NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="grid grid-cols-[auto_1fr] items-center gap-4"
            >
              {item.icon}
              <span className="border-b py-4">{item.text}</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex w-full flex-col items-center justify-center gap-6 pb-4 sm:font-medium">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Vestify logo"
                className="size-5 rounded-full"
              />
              <span className="ml-2 text-xs">Vestify</span>
            </div>
            <p className="text-muted-foreground flex items-center text-center text-xs">
              Copyright © 2025 Vestify
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
