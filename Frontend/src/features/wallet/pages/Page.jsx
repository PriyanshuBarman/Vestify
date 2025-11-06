import SendIcon from "@/components/icons/SendIcon";
import { Button } from "@/components/ui/button";
import { useGetBalance } from "@/hooks/useGetBalance";
import NumberFlow from "@number-flow/react";
import { QrCodeIcon, ScanLineIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import FaqsCard from "../components/cards/FaqsCard";
import RecentTnxCard from "../components/cards/RecentTnxCard";
import MyQrCodeDrawer from "../components/MyQrCodeDrawer";
import QrReader from "../components/QrReader";

function Page() {
  const navigate = useNavigate();
  const { data: balance } = useGetBalance();
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="mt-4 space-y-8 px-4 pb-20 sm:mx-auto sm:w-2xl sm:space-y-12">
      <h2 className="space-x-2 leading-0">
        <span className="font-[450] italic">Balance.</span>
        <span className="text-2xl font-semibold tabular-nums">
          <NumberFlow value={balance || 0} prefix="₹" />
        </span>
      </h2>

      {/* Quick Actions */}
      <div className="flex justify-between">
        <div className="Slot flex flex-col items-center justify-center">
          <Button
            onClick={() => navigate("/wallet/send")}
            size="lg"
            variant="outline"
            className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
          >
            <SendIcon className="text-primary fill size-8 sm:size-10" />
          </Button>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            Send Money
          </p>
        </div>

        <div className="Slot flex flex-col items-center justify-center">
          <QrReader isOpen={isScannerOpen} setIsOpen={setIsScannerOpen} />
          <Button
            onClick={() => setIsScannerOpen(true)}
            size="lg"
            variant="outline"
            className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
          >
            <ScanLineIcon className="text-primary size-8 stroke-[2.4px] sm:size-10" />
          </Button>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            Scan & Pay
          </p>
        </div>

        <div className="Slot flex flex-col items-center justify-center">
          <MyQrCodeDrawer>
            <Button
              size="lg"
              variant="outline"
              className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
            >
              <QrCodeIcon className="text-primary size-8.5 sm:size-10" />
            </Button>
          </MyQrCodeDrawer>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            My QR Code
          </p>
        </div>
      </div>

      <RecentTnxCard />
      <FaqsCard />
    </div>
  );
}
export default Page;
