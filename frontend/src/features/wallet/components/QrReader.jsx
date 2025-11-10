import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FlashlightIcon, ImageUpIcon, XIcon } from "lucide-react";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function QrReader({ isOpen, setIsOpen }) {
  // 🔹 Refs & State
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const fileInputRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handlers
  const handleClose = () => {
    scanner.current?.stop();
    scanner.current = null;
    setIsActive(false);
    setIsOpen(false);
  };

  const handleScanSuccess = (result) => {
    if (result?.startsWith("vestify@")) {
      navigate("/wallet/enter-amount", {
        state: {
          receiverId: result?.replace("vestify@", ""),
        },
      });
    } else {
      toast.warning("Please Scan a Vestify QR code");
    }

    handleClose();
  };

  const handleToggleFlashlight = async () => {
    try {
      await scanner.current?.toggleFlash();
      setIsFlashOn(scanner.current?.isFlashOn());
    } catch (error) {
      toast.warning(error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await QrScanner.scanImage(file);
      handleScanSuccess(result);
    } catch (error) {
      toast.warning(error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 🔹 Scanner Lifecycle
  useEffect(() => {
    if (!isOpen) return;

    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(
        videoEl.current,
        (result) => handleScanSuccess(result.data),
        {
          preferredCamera: "environment",
          highlightScanRegion: true,
          highlightCodeOutline: true,
          overlay: qrBoxEl.current || undefined,
        },
      );

      scanner.current
        .start()
        .then(() => setIsActive(true))
        .catch((err) => {
          console.error("Camera start error:", err);
          setIsActive(false);
          setIsOpen(false);
          toast.info(
            "Camera blocked or not accessible. Please allow in browser permissions & reload",
          );
        });
    }

    return () => {
      scanner.current?.stop();
      scanner.current = null;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-full overflow-hidden bg-black">
      {/* 🔹 Top Bar */}
      <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between p-4">
        <Button
          onClick={handleClose}
          size="icon"
          variant="ghost"
          className="rounded-full p-5 text-white"
        >
          <XIcon className="size-6" />
        </Button>
        <Button
          onClick={handleToggleFlashlight}
          size="icon"
          variant="ghost"
          className={`rounded-full p-5 ${
            isFlashOn ? "bg-white text-black" : "text-white"
          }`}
        >
          <FlashlightIcon className="size-5" />
        </Button>
      </div>

      {/* 🔹 Camera Preview */}
      <video ref={videoEl} className="h-full w-full object-cover" />

      {/* 🔹 QR Frame Overlay */}
      <div
        ref={qrBoxEl}
        className="pointer-events-none absolute inset-0 grid -translate-y-16 place-items-center"
      >
        <CustomQrFrame />
      </div>

      <p className="absolute inset-0 z-50 grid translate-y-28 place-items-center text-base text-white sm:translate-y-36">
        Scan QR Code
      </p>

      {/* 🔹 Upload Button */}
      <div className="absolute bottom-12 left-1/2 z-50 -translate-x-1/2">
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".png, .jpeg, .jpg"
            className="hidden"
          />
          <Button
            variant="secondary"
            onClick={handleUploadClick}
            className="rounded-3xl bg-white !px-6 py-5 leading-0 font-normal text-black shadow hover:bg-white"
            type="button"
          >
            <ImageUpIcon /> Upload Photo
          </Button>
        </>
      </div>
    </div>
  );
}

export default QrReader;

function CustomQrFrame() {
  return (
    <div className="relative grid min-h-66 min-w-66 place-items-center sm:min-h-82 sm:min-w-82">
      {/* Main rounded square (invisible) */}
      <div className="size-[93.5%] rounded-[42px] outline-[50vmax] outline-black/30 sm:size-[94%]" />

      {/* Top left corner */}
      <div className="absolute top-0 left-0">
        <div className="size-12 rounded-tl-full border-t-4 border-l-4 border-white" />
      </div>

      {/* Top right corner */}
      <div className="absolute top-0 right-0">
        <div className="size-12 rounded-tr-full border-t-4 border-r-4 border-white" />
      </div>

      {/* Bottom left corner */}
      <div className="absolute bottom-0 left-0">
        <div className="size-12 rounded-bl-full border-b-4 border-l-4 border-white" />
      </div>

      {/* Bottom right corner */}
      <div className="absolute right-0 bottom-0">
        <div className="size-12 rounded-br-full border-r-4 border-b-4 border-white" />
      </div>
    </div>
  );
}
