import ResponsivePinDialog from "@/components/ResponsivePinDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBalance } from "@/hooks/useGetBalance";
import { sanitizeAmount } from "@/utils/formatters";
import NumberFlow from "@number-flow/react";
import { IndianRupeeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useCreateInvestOrder } from "../hooks/useCreateInvestOrder";
import { useCreateSip } from "../hooks/useCreateSip";
import DatePicker from "./DatePicker";

function DesktopPaymentCard({ fund }) {
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [sipDate, setSipDate] = useState();
  const [activeTab, setActiveTab] = useState("lumpsum");

  const { data: balance } = useGetBalance();
  const sipMutation = useCreateSip();
  const lumpsumMutation = useCreateInvestOrder();

  const activeMutation = activeTab === "sip" ? sipMutation : lumpsumMutation;

  const { mutate: makePayment, isPending, isError } = activeMutation;

  const handleInvest = (pin) => {
    makePayment({ amount, sipDate, fund, pin });
  };

  return (
    <div className="bg-background fixed top-36 hidden h-[450px] w-[400px] rounded-xl border p-6 lg:right-[2%] lg:flex xl:right-30 xl:flex-col">
      <Tabs
        defaultValue="lumpsum"
        className="flex h-full w-full flex-col"
        onValueChange={setActiveTab}
      >
        <TabsList className="ring-muted-foreground/20 mb-4 w-full bg-transparent ring">
          <TabsTrigger
            value="lumpsum"
            className="data-[state=active]:text-primary data-[state=active]:bg-primary/10"
          >
            ONE-TIME
          </TabsTrigger>
          <TabsTrigger
            value="sip"
            className="data-[state=active]:text-primary data-[state=active]:bg-primary/10"
          >
            MONTHLY SIP
          </TabsTrigger>
        </TabsList>

        {/* =================== Lumpsum/One-Time Tab =================== */}

        <TabsContent value="lumpsum" className="flex h-full flex-col">
          <div className="mt-4 flex-grow space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium"> Amount</h2>
              <div className="input-wrapper text-muted-foreground relative w-1/2">
                <IndianRupeeIcon className="absolute top-2.5 left-3 h-4 w-4" />
                <Input
                  type="number"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(sanitizeAmount(e.target.value))}
                  placeholder="Amount"
                  required
                  className="peer invest-input"
                  min={fund?.lump_min}
                />
                <p className="invest-input-error mt-2">
                  Min Lumpsum is ₹{fund?.lump_min}
                </p>
              </div>
            </div>
          </div>

          <p className="mb-4 text-sm font-medium tabular-nums">
            Available Balance: <NumberFlow value={balance} prefix="₹" />
          </p>

          <Button
            size="lg"
            onClick={() => setIsPinDialogOpen(true)}
            disabled={isPending || amount < fund.lump_min}
            className="w-full"
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Invest"}
          </Button>

          <ResponsivePinDialog
            isOpen={isPinDialogOpen}
            setIsOpen={setIsPinDialogOpen}
            amount={amount}
            sendingTo={fund.short_name}
            onSubmit={handleInvest}
            isPending={isPending}
            isError={isError}
          />
        </TabsContent>

        {/* =================== SIP Tab =================== */}

        <TabsContent value="sip" className="flex h-full flex-col">
          <div className="mt-4 flex-grow space-y-10 px-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium"> SIP Amount</h2>
              <div className="input-wrapper text-muted-foreground relative w-1/2">
                <IndianRupeeIcon className="absolute top-2.5 left-3 h-4 w-4" />
                <Input
                  type="number"
                  placeholder="SIP Amount"
                  value={amount}
                  onChange={(e) => setAmount(sanitizeAmount(e.target.value))}
                  required
                  className="peer invest-input"
                  min={fund?.sip_min}
                />
                <p className="invest-input-error mt-2">
                  Min SIP amount is ₹{fund?.sip_min}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Monthly SIP Data</h2>
              <DatePicker sipDate={sipDate} setSipDate={setSipDate} />
            </div>
          </div>

          <p className="mb-4 space-y-2 text-sm font-medium tabular-nums">
            Available Balance:
            <NumberFlow value={balance} prefix="₹" />
          </p>

          <Button
            onClick={() => setIsPinDialogOpen(true)}
            size="lg"
            disabled={isPending || amount < fund.sip_min || !sipDate}
            className="w-full"
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Start Sip"}
          </Button>

          <ResponsivePinDialog
            isOpen={isPinDialogOpen}
            setIsOpen={setIsPinDialogOpen}
            amount={amount}
            sendingTo={fund.short_name}
            onSubmit={handleInvest}
            isPending={isPending}
            isError={isError}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DesktopPaymentCard;
