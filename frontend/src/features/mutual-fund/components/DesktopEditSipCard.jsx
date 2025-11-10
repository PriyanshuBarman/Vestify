import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IndianRupeeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetFundData } from "../hooks/useGetFundData";
import EditSipDatePicker from "./EditSipDatePicker";
import { useEditSip } from "../hooks/useEditSip";

function DesktopPaymentCard({ sipDetail }) {
  const { data: fund = {} } = useGetFundData(sipDetail.schemeCode);
  const [amount, setAmount] = useState();
  const [sipDate, setSipDate] = useState(sipDetail.sipDate);
  const { mutate: updateSip, isPending } = useEditSip();

  const handleUpdateSip = () => {
    if (!amount) return toast.error("Please enter amount");
    updateSip({ sipId: sipDetail.id, amount, sipDate });
  };

  return (
    <Card className="fixed top-30 right-10 hidden h-[450px] max-[840px]:w-xs min-[1160px]:right-30 md:flex lg:w-sm">
      <CardHeader className="bg-primary/10 text-primary mx-4 flex items-center justify-center rounded-lg py-3 text-sm">
        <CardTitle className="font-medium">Change Amount/Date</CardTitle>
      </CardHeader>

      <CardContent className="mt-4 h-full space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium"> SIP Amount</h2>
          <div className="input-wrapper text-muted-foreground relative w-1/2">
            <IndianRupeeIcon className="absolute top-2.5 left-3 h-4 w-4" />
            <Input
              type="number"
              inputMode="numeric"
              placeholder="SIP Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="peer invest-input"
              min={fund?.sip_min}
              onKeyDown={(e) => e.key === "Enter" && handleUpdateSip()}
            />
            <p className="invest-input-error mt-2">
              Min SIP amount is ₹{fund?.sip_min}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Monthly SIP Data</h2>
          <EditSipDatePicker
            sipDetail={sipDetail}
            sipDate={sipDate}
            setSipDate={setSipDate}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          disabled={
            sipDate > 28 ||
            (amount && amount < fund?.sip_min) ||
            (amount === sipDetail.amount && sipDate === sipDetail.sipDate) ||
            (!amount && sipDate === sipDetail.sipDate)
          }
          size="lg"
          onClick={handleUpdateSip}
          className="w-full p-2"
        >
          Confirm Update
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DesktopPaymentCard;
