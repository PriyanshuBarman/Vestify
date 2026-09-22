import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEditSip } from "../hooks/useEditSip";
import { useGetLiveData } from "../hooks/useGetLiveData";
import SipDatePicker from "./overlays/SipDatePicker";

function DesktopEditSipCard({ sipDetail }) {
  const [type, setType] = useState(sipDetail.type);
  const [value, setValue] = useState(
    sipDetail.type === "AMOUNT"
      ? sipDetail.amount?.toString()
      : sipDetail.quantity?.toString(),
  );
  const [sipDate, setSipDate] = useState(sipDetail.sipDate);
  const [frequency, setFrequency] = useState(sipDetail.frequency);
  const { mutate: updateSip, isPending } = useEditSip();

  const { price } = useGetLiveData(sipDetail.symbol);

  const numValue = Number(value);
  const isInvalidAmount = type === "AMOUNT" && numValue < (price || 0);

  const getApproxShares = () => {
    if (type !== "AMOUNT" || !price || !value) return 0;
    return Math.floor(numValue / price);
  };

  const handleUpdateSip = () => {
    const payload = { sipId: sipDetail.id, frequency, sipDate, type };
    if (type === "AMOUNT") {
      payload.amount = numValue;
    } else {
      payload.quantity = numValue;
    }
    updateSip(payload);
  };

  const isUnchanged =
    type === sipDetail.type &&
    value ===
      (sipDetail.type === "AMOUNT"
        ? sipDetail.amount?.toString()
        : sipDetail.quantity?.toString()) &&
    sipDate === sipDetail.sipDate &&
    frequency === sipDetail.frequency;

  return (
    <Card className="fixed top-30 right-10 hidden h-[450px] max-[840px]:w-xs min-[1160px]:right-30 md:flex flex-col lg:w-sm">
      <CardHeader className="bg-primary/10 text-primary mx-4 flex items-center justify-center rounded-lg py-3 text-sm">
        <CardTitle className="font-medium">Change Installment/Date</CardTitle>
      </CardHeader>

      <CardContent className="h-full space-y-6">
        <Tabs value={type} onValueChange={setType} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="QUANTITY">Quantity</TabsTrigger>
            <TabsTrigger value="AMOUNT">Amount</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center justify-between mt-4">
          <h2 className="text-sm font-medium">
            {" "}
            SIP {type === "AMOUNT" ? "Amount" : "Quantity"}
          </h2>
          <div className="relative w-1/2">
            <Input
              type="number"
              inputMode="numeric"
              placeholder={type === "AMOUNT" ? "Amount" : "Quantity"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="text-right"
              min="1"
            />
            {isInvalidAmount ? (
              <p className="text-xs text-destructive text-right mt-1">
                Min amount is ₹{price}
              </p>
            ) : type === "AMOUNT" && value ? (
              <p className="text-xs text-muted-foreground text-right mt-1">
                Approx ~{getApproxShares()} shares
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">SIP Date</h2>
          <div className="w-1/2 flex justify-end">
            <SipDatePicker
              sipDate={sipDate}
              setSipDate={setSipDate}
              frequency={frequency}
              setFrequency={setFrequency}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto pb-6">
        <Button
          disabled={
            !value ||
            numValue <= 0 ||
            isInvalidAmount ||
            isUnchanged ||
            isPending
          }
          size="lg"
          onClick={handleUpdateSip}
          className="w-full p-2"
        >
          {isPending && <Spinner />} Confirm Update
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DesktopEditSipCard;
