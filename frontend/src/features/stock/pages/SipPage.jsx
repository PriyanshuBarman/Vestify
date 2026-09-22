import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoBackButton from "@/components/GoBackButton";
import Keypad from "@/components/Keypad";
import { formatToINR, sanitizeAmount } from "@/utils/formatters";

import SipDatePicker from "../components/overlays/SipDatePicker";
import StockSipInfoDialog from "../components/overlays/StockSipInfoDialog";
import { useCreateSip } from "../hooks/useCreateSip";
import { useEditSip } from "../hooks/useEditSip";
import { useGetLiveData } from "../hooks/useGetLiveData";
import { useGetSipDetail } from "../hooks/useGetSipDetail";
import { useGetStockData } from "../hooks/useGetStockData";

function SipPage() {
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";
  const editSipId = searchParams.get("sipId");

  const location = useLocation();
  const stateSymbol = location.state?.symbol;

  const { data: editSipData, isLoading: isLoadingEditSip } =
    useGetSipDetail(editSipId);
  const editSip = editSipData?.sip;

  const symbol = stateSymbol || editSip?.symbol;

  const [type, setType] = useState("QUANTITY");
  const [frequency, setFrequency] = useState("MONTHLY");
  const [value, setValue] = useState(""); // Holds amount or quantity as string
  const [sipDate, setSipDate] = useState(null);

  // Initialize state when editing
  useEffect(() => {
    if (isEditMode && editSip) {
      setType(editSip.type);
      setFrequency(editSip.frequency);
      setSipDate(editSip.sipDate);
      if (editSip.type === "AMOUNT") {
        setValue(editSip.amount?.toString() || "");
      } else {
        setValue(editSip.quantity?.toString() || "");
      }
    }
  }, [editSip, isEditMode]);

  const { data: stock = {}, isLoading: isStockLoading } =
    useGetStockData(symbol);
  const live = useGetLiveData(symbol, { fallback: stock });
  const cmp = live?.price || 0;

  const createMutation = useCreateSip();
  const editMutation = useEditSip();
  const activeMutation = isEditMode ? editMutation : createMutation;
  const { mutate: submitSip, isPending } = activeMutation;

  const handleInvest = () => {
    const payload = {
      frequency,
      type,
      sipDate,
    };

    if (type === "AMOUNT") {
      payload.amount = Number(value);
    } else {
      payload.quantity = Number(value);
    }

    if (isEditMode) {
      submitSip({ sipId: editSipId, ...payload });
    } else {
      payload.symbol = stock.symbol;
      payload.name = stock.longName || stock.shortName;
      payload.shortName = stock.shortName || stock.symbol;
      submitSip(payload);
    }
  };

  const isSubmitDisabled = () => {
    if (isPending) return true;
    if (!sipDate) return true;
    if (!isEditMode && (!stock.symbol || isStockLoading)) return true;
    const numValue = Number(value);
    if (!numValue || numValue <= 0) return true;
    if (type === "AMOUNT" && numValue < cmp) return true;
    return false;
  };

  const getApproxShares = () => {
    if (type !== "AMOUNT" || !cmp || !value) return 0;
    const numValue = Number(value);
    return Math.floor(numValue / cmp);
  };

  if (isEditMode && isLoadingEditSip) {
    return (
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="flex h-dvh flex-col sm:mx-auto sm:max-w-lg">
      <div className="Title mt-4 flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <GoBackButton />
          <div className="max-w-[70vw]">
            <h5 className="font-medium truncate leading-tight">
              {stock.longName || stock.shortName || stock.symbol || symbol}
            </h5>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              NSE | {formatToINR(live.price)}
              <span
                className={
                  live.changePercent >= 0 ? "text-positive" : "text-negative"
                }
              >
                ({live.changePercent?.toFixed(2)}%)
              </span>
            </span>
          </div>
        </div>
        <StockSipInfoDialog type={type} />
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 px-4">
        <Tabs value={type} onValueChange={setType} className="w-full">
          <TabsList className="rounded-full mx-auto">
            <TabsTrigger
              value="QUANTITY"
              disabled={isPending}
              className="rounded-full px-4 "
            >
              Quantity
            </TabsTrigger>
            <TabsTrigger
              value="AMOUNT"
              disabled={isPending}
              className="rounded-full px-4 "
            >
              Amount
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <p className="text-muted-foreground text-sm mt-4">
          {type === "QUANTITY"
            ? "Enter number of shares"
            : "Enter investment amount"}
        </p>

        <Label className="flex w-full justify-center text-4xl mt-2">
          {type === "AMOUNT" && <span>₹</span>}
          <input
            readOnly
            autoComplete="off"
            type="text"
            inputMode="none"
            value={value}
            placeholder="0"
            onChange={(e) => setValue(sanitizeAmount(e.target.value))}
            className="field-sizing-content leading-0 outline-none max-w-[200px] text-center bg-transparent disabled:opacity-50"
            disabled={isPending}
          />
          <span className="Fake-Caret animate-caret-blink bg-foreground h-10 w-px duration-1000" />
        </Label>

        <div className="h-6 flex items-center justify-center">
          {type === "AMOUNT" && value && (
            <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Approx ~{getApproxShares()} shares
            </p>
          )}
        </div>

        <p
          className={`animate-in zoom-in-90 fade-in slide-in-from-bottom-0 text-xs font-medium duration-200 ${type === "AMOUNT" && value && Number(value) < cmp ? "" : "hidden"} text-red-400 text-center`}
        >
          Amount must be at least ₹{cmp} (1 share)
        </p>

        <SipDatePicker
          sipDate={sipDate}
          setSipDate={setSipDate}
          frequency={frequency}
          setFrequency={setFrequency}
        />
      </div>

      <div className="mt-auto flex flex-col items-center gap-2">
        <Keypad amount={value} setAmount={setValue} />

        <Button
          onClick={() => handleInvest()}
          size="lg"
          disabled={isSubmitDisabled()}
          className="my-4 w-[90%]"
        >
          {isEditMode ? "Save Changes" : "Start SIP"}
        </Button>
      </div>
    </div>
  );
}

export default SipPage;
