import GoBackBar from "@/components/GoBackBar";
import ResponsivePinDialog from "@/components/overlays/ResponsivePinDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetProfileById } from "@/hooks/useGetProfileById";
import { sanitizeAmount } from "@/utils/formatters";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
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
            autoComplete="off"
            type="text"
            inputMode="numeric"
            autoFocus
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
          className="min-h-0 w-fit max-w-3/4 resize-none overflow-hidden text-center text-sm"
        />
      </div>
      <Button
        disabled={!amount || !receiverName || !receiverUsername || isPending}
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
