import ProfileAvatar from "@/components/ProfileAvatar";
import { Button } from "@/components/ui/button";
import { formatToINR } from "@/utils/formatters";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useGetUser } from "@/hooks/useGetUser";
import { selectTheme, setTheme } from "@/store/slices/themeSlice";
import {
  ArrowLeftIcon,
  ArrowLeftRightIcon,
  LogOutIcon,
  LogsIcon,
  MoonIcon,
  Settings,
  SlidersHorizontal,
  SunIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import NumberFlow from "@number-flow/react";

const themeMapping = [
  { name: "system", icon: SlidersHorizontal },
  { name: "dark", icon: MoonIcon },
  { name: "light", icon: SunIcon },
];

function ProfilePage() {
  const navigate = useNavigate();
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const { data: user = {} } = useGetUser();
  const { data: balance } = useGetBalance();

  return (
    <div className="h-dvh sm:min-w-md sm:rounded-l-2xl sm:pl-6">
      <div className="p-4 sm:hidden">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </button>
        </div>
      </div>

      <div className="flex flex-col px-4">
        {/*================== Profile Info ================== */}
        <div className="z-10 flex flex-col items-center gap-6">
          <ProfileAvatar />
          <div>
            <h3 className="text-center text-lg font-semibold capitalize">
              {user.profile.name}
            </h3>
          </div>
        </div>

        {/* =============== Menu Items =============== */}
        <div className="mt-10 space-y-8 text-[0.94rem] font-medium">
          <div className="flex">
            <div className="flex">
              <WalletIcon className="text-muted-foreground" />
              <span className="ml-4">
                Balance : <NumberFlow value={balance || 0} prefix="₹" />{" "}
              </span>
            </div>
          </div>

          <Link to="/orders" className="flex">
            <LogsIcon className="text-muted-foreground" />
            <span className="ml-4">All Orders</span>
          </Link>

          <div className="flex">
            <UserIcon className="text-muted-foreground" />
            <span className="ml-4">Account Details</span>
          </div>

          <Link to="/wallet/transactions" className="flex">
            <ArrowLeftRightIcon className="text-muted-foreground" />
            <span className="ml-4">Transactions</span>
          </Link>

          <div className="flex">
            <Settings className="text-muted-foreground" />
            <span className="ml-4">Settings</span>
          </div>
        </div>

        {/*  ============== Theme Btns ============== */}
        <div className="Theme-Btns absolute inset-x-0 bottom-8 flex w-full flex-col items-center justify-center gap-6 px-4 sm:font-medium">
          <div className="flex min-w-full justify-around">
            {themeMapping.map((theme) => (
              <div key={theme.name}>
                <Button
                  onClick={() => dispatch(setTheme(theme.name))}
                  size="lg"
                  variant="outline"
                  className={`h-14 w-22 rounded-xl ${currentTheme === theme.name && "!bg-accent ring"}`}
                >
                  <theme.icon className="size-6" />
                </Button>
                <p className="mt-2 text-center text-sm font-medium capitalize">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link to="/auth/logout">
              Logout
              <LogOutIcon />
            </Link>
          </Button>
          {/* 
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
