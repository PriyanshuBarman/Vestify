import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatToINR } from "@/utils/formatters";
import { useState } from "react";
import { useLocation } from "react-router";
import { useAddStepUp } from "../hooks/useAddStepUp";
import { Spinner } from "@/components/ui/spinner";
import { addMonths, formatDate } from "date-fns";

const intervals = {
  "3M": 3,
  "6M": 6,
  "1Y": 12,
};

function StepUpSipPage() {
  const location = useLocation();
  const sipDetail = location.state;
  const [amount, setAmount] = useState(Number(sipDetail?.stepUpAmount) || 1000);
  const [percentage, setPercentage] = useState(
    Number(sipDetail?.stepUpPercentage) || 5,
  );
  const [intervalInMonths, setIntervalInMonths] = useState(
    sipDetail?.stepUpIntervalInMonths ?? 6,
  );
  const [selected, setSelected] = useState(() => {
    if (sipDetail?.stepUpAmount) return "amount";
    if (sipDetail?.stepUpPercentage) return "percentage";
    return "amount";
  });

  const { mutate: addStepUp, isPending } = useAddStepUp();
  const isStepUpAdded = !!sipDetail?.stepUpIntervalInMonths;

  const handleSubmit = () => {
    addStepUp({
      sipId: sipDetail.id,
      amount: selected === "amount" ? amount : null,
      percentage: selected === "percentage" ? percentage : null,
      intervalInMonths,
      isEdit: isStepUpAdded,
    });
  };

  const handleChange = (e) => {
    if (selected === "amount") {
      setAmount(Number(e.target.value));
    } else {
      setPercentage(Number(e.target.value));
    }
  };

  return (
    <div className="mx-auto flex h-dvh max-w-2xl flex-col px-4 tabular-nums sm:mt-28 sm:h-auto">
      <GoBackBar title="Step-up SIP" showSearchIcon={false} className="px-0" />
      <div className="mt-4 flex flex-col gap-6">
        <div className="flex justify-between">
          <span className="text-md">Current SIP Amount</span>
          <span className="font-medium">{formatToINR(sipDetail.amount)}</span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center">
            <span className="text-md">Increase by</span>
            <Select
              value={selected}
              onValueChange={(value) => setSelected(value)}
            >
              <SelectTrigger className="text-md border-none font-medium shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amount" className="text-md px-4 font-medium">
                  Amount
                </SelectItem>
                <SelectItem
                  value="percentage"
                  className="text-md px-4 font-medium"
                >
                  Percentage
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            type="number"
            autoFocus
            onChange={handleChange}
            value={selected === "amount" ? amount : percentage}
            className="border-primary focus-visible:ring-primary/50 focus-visible:border-primary/50 max-w-28 px-4 text-end font-medium"
          />
        </div>

        <div className="flex justify-between">
          <span className="text-md">After every </span>
          <div className="space-x-2 font-medium">
            {Object.keys(intervals).map((interval) => (
              <Button
                key={interval}
                onClick={() => setIntervalInMonths(intervals[interval])}
                size="icon-sm"
                variant="outline"
                className={`rounded-full px-6 text-xs font-normal shadow-none ${
                  intervalInMonths === intervals[interval] &&
                  "bg-primary/10 text-primary border-primary"
                } `}
              >
                {interval}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto mb-4 w-full space-y-4 sm:mt-8">
        <Description
          intervalInMonths={intervalInMonths}
          sipDetail={sipDetail}
          amount={amount}
          percentage={percentage}
          selected={selected}
        />
        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={
            isPending ||
            (selected === "amount" && !amount) ||
            (selected === "percentage" && !percentage) ||
            (intervalInMonths === sipDetail?.stepUpIntervalInMonths &&
              ((selected === "amount" &&
                amount === Number(sipDetail?.stepUpAmount)) ||
                (selected === "percentage" &&
                  percentage === Number(sipDetail?.stepUpPercentage))))
          }
        >
          {isPending && <Spinner />}{" "}
          {isStepUpAdded ? "Edit Step-up" : "Proceed"}
        </Button>
      </div>
    </div>
  );
}

export default StepUpSipPage;

function Description({
  intervalInMonths,
  sipDetail,
  amount,
  percentage,
  selected,
}) {
  const stepUpDate = formatDate(
    addMonths(new Date(), intervalInMonths),
    "MMM yy",
  );
  const stepUpValue =
    selected === "amount"
      ? Number(sipDetail.amount) + Number(amount)
      : `${(Number(sipDetail.amount) * (1 + Number(percentage) / 100)).toFixed(0)}`;

  return (
    <p className="bg-accent text-muted-foreground w-full rounded-xl p-4 text-center text-xs tabular-nums">
      SIP amount will increase to{" "}
      <span className="font-semibold">{formatToINR(stepUpValue)}</span> from{" "}
      <span className="font-semibold">{stepUpDate} </span>
      onwards
    </p>
  );
}
