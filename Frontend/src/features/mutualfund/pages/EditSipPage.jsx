import GoBackBtn from "@/components/GoBackBtn";
import Keypad from "@/components/Keypad";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatToINR } from "@/utils/formatters";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import EditSipDatePicker from "../components/EditSipDatePicker";
import { useEditSip } from "../hooks/useEditSip";
import { useGetFundData } from "../hooks/useGetFundData";
import { useGetSipDetail } from "../hooks/useGetSipDetail";

function EditSipPage() {
  const { sipId } = useParams();
  const { data } = useGetSipDetail(sipId);
  const sipDetail = data?.sip || {};

  const { data: fund = {} } = useGetFundData(sipDetail.schemeCode);
  const [amount, setAmount] = useState(sipDetail.amount);
  const [sipDate, setSipDate] = useState(sipDetail.sipDate);
  const { mutate: editSip, isPending } = useEditSip();

  const handleUpdateSip = () => {
    if (!amount) return toast.error("Please enter amount");
    editSip({ sipId, amount, sipDate });
  };

  return (
    <div className="flex h-svh flex-col justify-between">
      {/* ================= Title ================= */}
      <div className="Title mt-4 flex items-center gap-4 px-4">
        <GoBackBtn />
        <div>
          <h5 className="font-medium">SIP</h5>
          <p className="text-xs">{fund.name}</p>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="mt-8 mb-auto flex flex-col items-center gap-y-14 px-4">
        {/* Installment Amount */}
        <div className="relative text-center">
          <p className="text-muted-foreground text-sm">Installment amount</p>
          <h1 className="mt-2 text-4xl">
            ₹ {amount?.toLocaleString()}
            <span className="text-muted-foreground animate-[blink_1s_step-start_infinite] text-5xl font-thin ease-in-out">
              |
            </span>
          </h1>
          {amount !== 0 && amount < fund.sip_min && (
            <p className="mt-2 text-xs font-medium text-nowrap text-red-400">
              The minimum SIP amount is {formatToINR(fund.sip_min)}{" "}
            </p>
          )}
        </div>

        {/* Add Extra Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() =>
              setAmount((prev) => (parseInt(prev) + 500).toString())
            }
          >
            + ₹500
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() =>
              setAmount((prev) => (parseInt(prev) + 1000).toString())
            }
          >
            + ₹1,0000
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() =>
              setAmount((prev) => (parseInt(prev) + 5000).toString())
            }
          >
            + ₹5,000
          </Button>
        </div>
        <EditSipDatePicker
          sipDate={sipDate}
          setSipDate={setSipDate}
          sipDetail={sipDetail}
        />
      </div>

      {/*=============== Keypad & Save/Update Button =============== */}
      <div>
        <Keypad setAmount={setAmount} />

        {/*======== Save/Update Button ======== */}
        <div className="mt-6 flex justify-evenly p-4">
          <Button
            disabled={
              isPending ||
              amount < fund.sip_min ||
              (amount === sipDetail.amount && sipDate === sipDetail.sipDate)
            }
            size="lg"
            onClick={handleUpdateSip}
            className="w-full"
          >
            {isPending ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditSipPage;
