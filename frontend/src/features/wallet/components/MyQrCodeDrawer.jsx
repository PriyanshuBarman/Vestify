import QRCode from "qrcode";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useGetUser } from "@/hooks/useGetUser";
import { useIsMobile } from "@/hooks/useIsMobile";
import { DownloadIcon, ShareIcon } from "lucide-react";
import { toast } from "sonner";

export default function MyQrCodeDrawer({ children }) {
  const isMobile = useIsMobile();
  const [qrCodeUrl, setQrCodeUrl] = useState();
  const { data: user } = useGetUser();

  useEffect(() => {
    if (!user) return;

    QRCode.toDataURL(`vestify@${user?.id}`)
      .then((url) => {
        setQrCodeUrl(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  const handleShare = async () => {
    try {
      if (!qrCodeUrl) {
        toast.error("QR not ready yet!");
        return;
      }

      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const file = new File([blob], "qrcode.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${user?.profile?.name}'s Vestify QR Code`,
          text: "Scan this QR code",
        });
      } else {
        toast.info("Sharing not supported on this device/browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share QR code");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle className="text-lg">My QR Code</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col items-center justify-center">
          <img src={qrCodeUrl} alt="" className="size-72 rounded-4xl" />
        </div>

        <DrawerFooter className="mt-4 flex-row justify-center gap-6">
          <DrawerClose asChild>
            <>
              <Button
                onClick={handleShare}
                size="lg"
                variant="outline"
                className="w-fit rounded-full"
              >
                <ShareIcon />
                Share
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-fit rounded-full"
              >
                <a
                  href={qrCodeUrl}
                  download="qrcode.png"
                  className="flex items-center gap-2"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Download</span>
                </a>
              </Button>
            </>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
