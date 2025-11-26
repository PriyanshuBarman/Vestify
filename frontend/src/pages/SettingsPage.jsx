import GoBackBar from "@/components/GoBackBar";
import ThemeChangeButton from "@/components/ThemeChangeButton";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useGetUser";
import {
  ChevronRightIcon,
  DatabaseZapIcon,
  KeyRoundIcon,
  LockIcon,
  LogOutIcon,
  MonitorSmartphone,
  User2Icon,
} from "lucide-react";
import { Link } from "react-router";

function SettingsPage() {
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
          <ThemeChangeButton />
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
        <Link
          to="/settings/clear-cache"
          className="grid grid-cols-[auto_1fr] items-center"
        >
          <DatabaseZapIcon className="text-muted-foreground size-5" />
          <div className="flex items-center justify-between border-b p-4 font-medium">
            Clear cache
            <ChevronRightIcon className="text-muted-foreground stroke-[1.5px]" />
          </div>
        </Link>
      </section>

      <Button
        asChild
        size="lg"
        variant="outline"
        className="mx-auto mt-auto mb-4 w-[90%] sm:mt-4"
      >
        <Link to="/auth/logout" replace>
          Logout
          <LogOutIcon />
        </Link>
      </Button>
    </div>
  );
}
export default SettingsPage;
