import GoBackBtn from "@/components/GoBackBtn";
import Keypad from "@/components/Keypad";
import ResponsivePinDialog from "@/components/overlays/ResponsivePinDialog";
import { Button } from "@/components/ui/button";
import { TZDate } from "@date-fns/tz";
import { getDate } from "date-fns";
import { useState } from "react";
import { useLocation } from "react-router";
import DatePicker from "../components/overlays/DatePicker";
import { Label } from "@/components/ui/label";
import { sanitizeAmount } from "@/utils/formatters";
import { useCreateInvestOrder } from "../hooks/useCreateInvestOrder";
import { useCreateSip } from "../hooks/useCreateSip";
import { useGetFundData } from "../hooks/useGetFundData";
import { formatToINR } from "@/utils/formatters";

function InvestPage() {
  const [amount, setAmount] = useState("");
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const { schemeCode, orderType } = useLocation().state ?? {};
  const { data: fund = {} } = useGetFundData(schemeCode);
  const isSip = orderType === "sip";
  const [sipDate, setSipDate] = useState(
    isSip ? getDate(TZDate.tz("Asia/Kolkata")) : null,
  );

  const sipMutation = useCreateSip();
  const lumpsumMutation = useCreateInvestOrder();

  const activeMutation = sipDate ? sipMutation : lumpsumMutation;

  const { mutate: makePayment, isPending, isError, error } = activeMutation;

  const handleInvest = (pin) => {
    makePayment({ amount, sipDate, fund, pin });
  };

  const handleAddExtra = (value) => {
    const amt = Number(amount || 0) + value;
    const sanitized = sanitizeAmount(amt.toString());
    setAmount(sanitized);
  };

  return (
    <div className="flex h-dvh flex-col sm:mx-auto sm:max-w-lg">
      {/* ================= Title ================= */}
      <div className="Title mt-4 flex items-center gap-4 px-4">
        <GoBackBtn />
        <div>
          <h5 className="font-medium">{isSip ? "SIP" : "One-Time"}</h5>
          <p className="text-xs">{fund.name}</p>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="mt-8 flex flex-col items-center gap-6">
        <p className="text-muted-foreground text-sm">
          {isSip ? "Installment amount" : "Investment amount"}
        </p>

        {/*  Amount */}
        <Label className="flex w-full justify-center text-4xl">
          <span>₹</span>
          <input
            readOnly
            autoComplete="off"
            type="text"
            inputMode="none"
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(sanitizeAmount(e.target.value))}
            className="field-sizing-content leading-0 outline-none"
          />
          <span className="Fake-Caret animate-caret-blink bg-foreground h-10 w-px duration-1000" />
        </Label>

        <p
          className={`animate-in zoom-in-90 fade-in slide-in-from-bottom-0 text-xs font-medium duration-200 ${amount && amount < (isSip ? fund.sip_min : fund.lump_min) ? "" : "hidden"} text-red-400`}
        >
          The minimum amount for {isSip ? "SIP" : "Lumpsum"} is{" "}
          {formatToINR(isSip ? fund.sip_min : fund.lump_min)}
        </p>

        {/* Add Extra Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="rounded-full text-xs"
            onClick={() => handleAddExtra(500)}
          >
            + ₹500
          </Button>
          <Button
            variant="outline"
            className="rounded-full text-xs"
            onClick={() => handleAddExtra(1000)}
          >
            + ₹1,000
          </Button>
          <Button
            variant="outline"
            className="rounded-full text-xs"
            onClick={() => handleAddExtra(5000)}
          >
            + ₹5,000
          </Button>
        </div>

        {isSip && <DatePicker sipDate={sipDate} setSipDate={setSipDate} />}
      </div>

      {/*=============== Keypad & Invest/Submit Button =============== */}
      <div className="mt-auto flex flex-col items-center gap-2">
        <Keypad amount={amount} setAmount={setAmount} />

        <Button
          onClick={() => setIsPinDialogOpen(true)}
          size="lg"
          disabled={amount < (isSip ? fund.sip_min : fund.lump_min)}
          className="my-4 w-[90%]"
        >
          {isSip ? "Start SIP" : "Invest"}
        </Button>
      </div>

      <ResponsivePinDialog
        isOpen={isPinDialogOpen}
        setIsOpen={setIsPinDialogOpen}
        amount={amount}
        sendingTo={fund.short_name}
        onSubmit={handleInvest}
        isPending={isPending}
        isError={isError}
        error={error}
      />
    </div>
  );
}

export default InvestPage;
