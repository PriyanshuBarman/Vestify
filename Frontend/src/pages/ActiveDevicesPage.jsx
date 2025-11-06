import GoBackBar from "@/components/GoBackBar";
import LoadingState from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { Separator } from "@/components/ui/separator";
import { useDeleteAllSessions } from "@/hooks/useDeleteAllSession";
import { useDeleteSession } from "@/hooks/useDeleteSession";
import { useGetSessions } from "@/hooks/useGetSessions";
import { format } from "date-fns";
import {
  ChevronRightIcon,
  LaptopMinimalIcon,
  LogOutIcon,
  MonitorIcon,
  SmartphoneIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UAParser } from "ua-parser-js";

const deviceIcons = {
  mobile: <SmartphoneIcon />,
  tablet: <LaptopMinimalIcon />,
  desktop: <MonitorIcon />,
  unknown: <MonitorIcon />,
};

export default function ActiveDevicesPage() {
  const { data: sessions = [], isPending } = useGetSessions();
  const { mutate: revoke } = useDeleteSession();
  const { mutate: revokeAll } = useDeleteAllSessions();
  const [selected, setSelected] = useState(null); // { id?, isCurrentDevice: boolean }
  const navigate = useNavigate();

  const handleDeviceClick = (sessionId, isCurrentDevice = false) => {
    setSelected({ sessionId, isCurrentDevice });
  };

  const handleLogoutAction = () => {
    if (!selected) return;

    if (selected.isCurrentDevice) {
      navigate("/auth/logout");
    } else {
      revoke({ sessionId: selected.sessionId });
    }

    setSelected(null);
  };

  return (
    <div className="flex h-dvh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg">
      <GoBackBar
        title="Active devices"
        showSearchIcon={false}
        className="px-0"
      />

      <p className="text-muted-foreground mt-2 text-xs">
        You're currently logged in on these devices. Multiple sessions on the
        same device mean you have Vestify open in more than one browser.
      </p>

      {/* Current Device */}
      <section className="mt-6">
        <h2 className="text-md mb-2 font-medium">Current device</h2>
        <DeviceItem
          userAgent={navigator.userAgent}
          onClick={() => handleDeviceClick(null, true)}
        />
      </section>

      <Separator className="mb-6" />

      {/* Active Devices */}
      <section>
        <h2 className="text-md mb-2 font-medium">Active devices</h2>
        <p className="text-muted-foreground mb-4 text-xs leading-relaxed">
          If you log in on more devices, they’ll appear here. If you don’t
          recognize a device, log out from it to secure your account.
        </p>

        {isPending ? (
          <LoadingState className="mt-12" />
        ) : sessions.length <= 1 ? (
          <img
            src="/Devices-bro.svg"
            alt="No other devices"
            className="mx-auto w-2xs sm:w-xs"
          />
        ) : (
          <ItemGroup className="gap-4">
            {sessions
              .filter((s) => s.userAgent !== navigator.userAgent)
              .map((session) => (
                <DeviceItem
                  key={session.id}
                  userAgent={session.userAgent}
                  updatedAt={session.updatedAt}
                  onClick={() => handleDeviceClick(session.id, false)}
                />
              ))}
          </ItemGroup>
        )}

        {sessions.length > 2 && (
          <Button
            onClick={() => revokeAll()}
            variant="ghost"
            size="sm"
            className="text-primary px-0"
          >
            <LogOutIcon /> Logout from all devices
          </Button>
        )}
      </section>

      {/* Modal */}
      <ResponsiveModal open={!!selected} onOpenChange={() => setSelected(null)}>
        <ResponsiveModalContent>
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>
              Log out from this device?
            </ResponsiveModalTitle>
          </ResponsiveModalHeader>
          <ResponsiveModalFooter>
            <Button onClick={handleLogoutAction}>Logout</Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </div>
  );
}

/* Device Item */
function DeviceItem({ userAgent, updatedAt, onClick }) {
  const info = UAParser(userAgent);
  const type = info.device.type || "unknown";
  const os = info.os.name || "Unknown OS";
  const lastActive = updatedAt
    ? "Last active - " + format(updatedAt, "PPp")
    : "Active now";

  return (
    <Item onClick={onClick} className="px-0">
      <ItemMedia variant="icon" className="size-12 rounded-full">
        {deviceIcons[type]}
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{os}</ItemTitle>
        <ItemDescription>{lastActive}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          aria-label="Log out"
        >
          <ChevronRightIcon />
        </Button>
      </ItemActions>
    </Item>
  );
}
