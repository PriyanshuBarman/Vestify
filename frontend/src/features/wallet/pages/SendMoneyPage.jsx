import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { useLocation } from "react-router";

import { useGetProfileById } from "@/hooks/useGetProfileById";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import GoBackBar from "@/components/GoBackBar";
import ResponsivePinDialog from "@/components/overlays/ResponsivePinDialog";
import { sanitizeAmount } from "@/utils/formatters";

import { useSendMoney } from "../hooks/useSendMoney";

function SendMoneyPage() {
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const location = useLocation();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState();

  const receiverId = location.state.receiverId;

  const { data: profile } = useGetProfileById(receiverId, location.state);

  // Use profile data from API if not provided in state
  const receiverName = location.state?.receiverName || profile?.name;
  const receiverUsername =
    location.state?.receiverUsername || profile?.username;
  const receiverAvatar = location.state?.receiverAvatar || profile?.avatar;

  const { mutate: makePayment, isPending, isError, error } = useSendMoney();

  const handleSubmit = (pin) => {
    makePayment({
      amount,
      note,
      receiverId,
      pin,
      name: receiverName,
    });
  };

  return (
    <div className="relative h-dvh sm:mx-auto sm:h-fit sm:w-xl">
      <GoBackBar />

      <div className="mt-8 w-full place-items-center space-y-4">
        <Avatar className="size-16">
          <AvatarImage src={receiverAvatar} alt="profile-picture" />
          <AvatarFallback className="text-xl uppercase">
            {receiverName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium capitalize">{receiverName}</h3>
          <p className="text-muted-foreground text-sm">@{receiverUsername}</p>
        </div>

        <Label className="flex w-full justify-center text-5xl">
          <span>₹</span>
          <input
            autoFocus
            autoComplete="off"
            maxLength={9}
            type="text"
            inputMode="numeric"
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(sanitizeAmount(e.target.value))}
            className="field-sizing-content outline-none"
          />
        </Label>

        <Textarea
          onChange={(e) => setNote(e.target.value)}
          value={note}
          placeholder="Add Note"
          maxLength={100}
          className="min-h-0 w-fit max-w-3/4 resize-none overflow-hidden text-center text-sm"
        />
        {amount >= 100000000 && (
          <p className="text-sm text-destructive">
            Amount must be less than ₹10Cr
          </p>
        )}
      </div>
      <Button
        disabled={
          !amount ||
          amount >= 100000000 ||
          !receiverName ||
          !receiverUsername ||
          isPending
        }
        className="absolute right-6 bottom-6 rounded-2xl px-7 py-7"
        onClick={() => setIsPinDialogOpen(true)}
      >
        <ArrowRightIcon className="size-8" />
      </Button>

      <ResponsivePinDialog
        isOpen={isPinDialogOpen}
        setIsOpen={setIsPinDialogOpen}
        amount={amount}
        sendingTo={receiverName}
        onSubmit={handleSubmit}
        isPending={isPending}
        isError={isError}
        error={error}
      />
    </div>
  );
}

export default SendMoneyPage;
