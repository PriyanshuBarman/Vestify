import GoBackBtn from "@/components/GoBackBtn";
import Keypad from "@/components/Keypad";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/useIsMobile";
import { formatToINR, sanitizeAmount } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ConfirmRedeemModal from "../components/overlays/ConfirmRedeemModal";
import { useGetFundData } from "../hooks/useGetFundData";
import { useRedeemFund } from "../hooks/useRedeemFund";

function RedeemPage() {
  const isMobile = useIsMobile();
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { schemeCode, current, units, folio } = location.state;
  const { data: fund = {} } = useGetFundData(schemeCode);

  const { mutate: redeemFund, isPending, isError } = useRedeemFund();

  const handleRedeem = () => {
    redeemFund({
      folio,
      amount: amount,
    });
  };

  useEffect(() => {
    if (isError) setAmount("");
  }, [isError]);

  if (isMobile)
    return (
      <div className="flex h-dvh flex-col">
        {/* ================= Title ================= */}
        <div className="Title mt-4 flex items-center gap-4 px-4">
          <GoBackBtn />
          <div>
            <h5 className="font-medium">Redeem {fund.short_name}</h5>
            <p className="text-xs">{formatToINR(current)} available</p>
          </div>
        </div>

        {/* ================= Content ================= */}
        <div className="mt-8 flex flex-col items-center gap-6 px-4">
          <p className="text-muted-foreground text-sm">Enter Amount</p>

          {/*  Amount */}
          <Label className="flex w-full justify-center text-[2.5rem]">
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
            className={`animate-in zoom-in-90 fade-in slide-in-from-bottom-0 text-xs font-medium duration-200 ${amount && amount < fund.redemption_amount_minimum ? "" : "hidden"} text-red-400`}
          >
            Minimum redemption amount is{" "}
            {formatToINR(fund.redemption_amount_minimum)}
          </p>
          <p
            className={`animate-in zoom-in-90 fade-in slide-in-from-bottom-0 text-xs font-medium duration-200 ${amount && amount > current ? "" : "hidden"} text-red-400`}
          >
            Available: {formatToINR(current)}
          </p>

          <Label className="text-muted-foreground flex items-center text-sm">
            <Checkbox
              checked={amount == current}
              onCheckedChange={(checked) => {
                setAmount(checked ? current : "");
              }}
            />
            Redeem all
          </Label>
        </div>

        {/*=============== Keypad & Invest/Submit Button =============== */}
        <div className="mt-auto flex flex-col items-center gap-2">
          <Keypad amount={amount} setAmount={setAmount} />

          <Button
            onClick={() => setOpen(true)}
            size="lg"
            disabled={
              isPending ||
              !amount ||
              amount > current ||
              amount < fund.redemption_amount_minimum
            }
            className="my-4 w-[88%]"
          >
            Proceed
          </Button>
        </div>
        <ConfirmRedeemModal
          onConfirm={handleRedeem}
          amount={amount}
          units={amount == current ? units : null} // pass units if full-redemption
          fund={fund}
          isOpen={open}
          onOpenChange={setOpen}
        />
      </div>
    );

  // ======================= Desktop View =======================

  if (!isMobile)
    return (
      <div className="bg-card mt-20 flex flex-col rounded-3xl border p-4 sm:mx-auto sm:max-w-xl">
        {/* ================= Title ================= */}
        <div className="Title mt-4 flex items-center gap-4 px-4">
          <GoBackBtn />
          <div>
            <h5 className="font-medium">Redeem {fund.short_name}</h5>
            <p className="text-xs">{formatToINR(current)} available</p>
          </div>
        </div>

        {/* ================= Content ================= */}
        <div className="mt-8 flex flex-col items-center gap-8 px-4">
          <p className="text-sm font-medium">Enter Amount</p>

          {/*  Amount */}
          <Label className="flex w-full justify-center text-[2.5rem]">
            <span>₹</span>
            <input
              autoFocus
              type="text"
              inputMode="none"
              value={amount}
              placeholder="0"
              onChange={(e) => setAmount(sanitizeAmount(e.target.value))}
              className="field-sizing-content leading-0 outline-none"
            />
          </Label>

          <p
            className={`animate-in zoom-in-90 fade-in slide-in-from-bottom-0 text-xs font-medium duration-200 ${amount && amount < fund.redemption_amount_minimum ? "" : "hidden"} text-red-400`}
          >
            Minimum redemption amount is{" "}
            {formatToINR(fund.redemption_amount_minimum)}
          </p>
          <p
            className={`animate-in zoom-in-90 fade-in slide-in-from-bottom-0 text-xs font-medium duration-200 ${amount && amount > current ? "" : "hidden"} text-red-400`}
          >
            Available: {formatToINR(current)}
          </p>

          <Label className="flex items-center text-sm">
            <Checkbox
              checked={amount == current}
              onCheckedChange={(checked) => {
                setAmount(checked ? current : "");
              }}
            />
            Redeem all
          </Label>
        </div>

        <Button
          onClick={() => setOpen(true)}
          size="lg"
          disabled={
            isPending ||
            !amount ||
            amount > current ||
            amount < fund.redemption_amount_minimum
          }
          className="w-ufull my-4 ml-auto"
        >
          {isPending && <Spinner />} Proceed
        </Button>
        <ConfirmRedeemModal
          onConfirm={handleRedeem}
          amount={amount}
          units={amount == current ? units : null} // pass units if full-redemption
          fund={fund}
          isOpen={open}
          onOpenChange={setOpen}
        />
      </div>
    );
}

export default RedeemPage;
