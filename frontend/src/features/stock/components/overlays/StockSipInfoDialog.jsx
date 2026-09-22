import { InfoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function StockSipInfoDialog({ type }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon className="text-muted-foreground" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Stock SIP Information</DialogTitle>
        </DialogHeader>
        <div className="text-sm space-y-4 pt-2">
          {(!type || type === "QUANTITY") && (
            <p>
              <strong>By Quantity:</strong> Exactly the specified number of
              shares will be purchased on each SIP date at the prevailing market
              price. Your wallet will be debited for the total cost.
            </p>
          )}

          {(!type || type === "AMOUNT") && (
            <>
              <p>
                <strong>By Amount:</strong> On the SIP date, we calculate the
                maximum number of whole shares you can buy with your SIP amount.
                We only deduct the required cost for those shares from your
                wallet. The remaining unutilized amount is <b>not</b> deducted.
              </p>
              <p className="text-muted-foreground text-xs p-3 bg-muted rounded-md">
                Note: In real brokerages (like Groww), the entire SIP amount is
                usually deducted from your Bank and added to your Broker Wallet.
                Shares are then purchased, and any remaining balance stays in
                your Wallet. Since Vestify uses a unified wallet system, we
                optimize this by only deducting the exact share cost!
              </p>
            </>
          )}

          <p>
            <strong>Execution:</strong> Orders are placed automatically and
            execute when the market opens.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StockSipInfoDialog;
