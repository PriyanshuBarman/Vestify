import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useGetUser";
import { selectTheme, setTheme } from "@/store/slices/themeSlice";
import {
  ChevronRightIcon,
  DatabaseZapIcon,
  KeyRoundIcon,
  LockIcon,
  LogOutIcon,
  MonitorIcon,
  MonitorSmartphone,
  MoonIcon,
  SunIcon,
  User2Icon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const THEMES = [
  { name: "system", icon: <MonitorIcon /> },
  { name: "dark", icon: <MoonIcon /> },
  { name: "light", icon: <SunIcon /> },
];

function SettingsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const { data: user } = useGetUser();

  return (
    <div className="flex h-dvh flex-col gap-4 sm:m-auto sm:max-w-lg sm:gap-8">
      <GoBackBar title="Settings" showSearchIcon={false} className="fixed" />

      <section className="mx-4 mt-18 text-sm">
        <h6 className="text-muted-foreground text-2xs mb-2 tracking-wider">
          APPEARENCE
        </h6>
        <div className="flex items-center justify-between">
          Theme
          <div className="flex justify-between rounded-full border p-0.5">
            {THEMES.map((theme) => (
              <div key={theme.name}>
                <Button
                  onClick={() => dispatch(setTheme(theme.name))}
                  variant="secondery"
                  className={`w-20 rounded-full border-none shadow-none ${currentTheme === theme.name && "bg-primary text-background ring"}`}
                >
                  {theme.icon}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 ml-4 text-sm">
        <h6 className="text-muted-foreground text-2xs mb-2 tracking-wider">
          PRIVACY & SECURITY
        </h6>
        {!user.authProvider && (
          <Link
            to="/settings/change-password"
            className="grid grid-cols-[auto_1fr] items-center"
          >
            <LockIcon className="text-muted-foreground" />
            <div className="flex items-center justify-between border-b p-4 font-medium">
              Change password
              <ChevronRightIcon className="text-muted-foreground stroke-[1.5px]" />
            </div>
          </Link>
        )}

        <Link
          to="/settings/change-pin"
          className="grid grid-cols-[auto_1fr] items-center"
        >
          <KeyRoundIcon className="text-muted-foreground" />
          <div className="flex items-center justify-between border-b p-4 font-medium">
            Change pin
            <ChevronRightIcon className="text-muted-foreground stroke-[1.5px]" />
          </div>
        </Link>
        <Link
          to="/settings/active-devices"
          className="grid grid-cols-[auto_1fr] items-center"
        >
          <MonitorSmartphone className="text-muted-foreground" />
          <div className="flex items-center justify-between border-b p-4 font-medium">
            Active devices
            <ChevronRightIcon className="text-muted-foreground stroke-[1.5px]" />
          </div>
        </Link>
      </section>

      <section className="mt-4 ml-4 text-sm">
        <h6 className="text-muted-foreground text-2xs mb-2 tracking-wider">
          DANGER ZONE
        </h6>

        <Link
          to="/settings/delete-account"
          className="grid grid-cols-[auto_1fr] items-center"
        >
          <User2Icon className="text-muted-foreground size-5" />
          <div className="flex items-center justify-between border-b p-4 font-medium">
            Delete account
            <ChevronRightIcon className="text-muted-foreground stroke-[1.5px]" />
          </div>
        </Link>
        {/* <Link
          to="/settings/delete-account"
          className="grid grid-cols-[auto_1fr] items-center"
        >
          <DatabaseZapIcon className="text-muted-foreground size-5" />
          <div className="flex items-center justify-between border-b p-4 font-medium">
            Clear cache
            <ChevronRightIcon className="text-muted-foreground stroke-[1.5px]" />
          </div>
        </Link> */}
      </section>

      <Button
        asChild
        size="lg"
        variant="outline"
        className="mx-auto mt-auto mb-4 w-[90%] sm:mt-4"
      >
        <Link to="/auth/logout">
          Logout
          <LogOutIcon />
        </Link>
      </Button>
    </div>
  );
}
export default SettingsPage;
