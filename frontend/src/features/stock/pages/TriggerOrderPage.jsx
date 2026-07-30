import { useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { useLocation, useParams } from "react-router";

import { cn } from "@/lib/utils";
import { useGetBalance } from "@/hooks/useGetBalance";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GoBackButton from "@/components/GoBackButton";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveData } from "../hooks/useGetLiveData";
import { useGetSingleStockPortfolio } from "../hooks/useGetSingleStockPortfolio";
import { useGetStockData } from "../hooks/useGetStockData";
import { useModifyOrder } from "../hooks/useModifyOrder";
import { usePlaceBuyOrder } from "../hooks/usePlaceBuyOrder";
import { usePlaceSellOrder } from "../hooks/usePlaceSellOrder";
import { useSubscribeStock } from "../hooks/useSubscribeStock";

function TriggerOrderPage() {
  const location = useLocation();
  const { symbol } = useParams() ?? {};

  // Edit mode: existing order passed via location.state
  const editOrder = location.state?.order;
  const isEditMode = Boolean(editOrder);

  const [selectedAction, setSelectedAction] = useState(
    editOrder?.action || undefined,
  ); //  "BUY" | "SELL"
  const [quantity, setQuantity] = useState(
    editOrder?.quantity?.toString() || "",
  );
  const [priceType, setPriceType] = useState(
    editOrder?.limitPrice ? "LIMIT" : "MARKET",
  ); // "MARKET" | "LIMIT"
  const [limitPrice, setLimitPrice] = useState(
    editOrder?.limitPrice?.toString() || "",
  );
  const [triggerPrice, setTriggerPrice] = useState(
    editOrder?.triggerPrice?.toString() || "",
  );

  // Stock details & live price
  const { data: stock = {} } = useGetStockData(symbol);
  useSubscribeStock(symbol);
  const live = useGetLiveData(symbol, { fallback: stock });

  const { data: balance = 0 } = useGetBalance();
  const { data: portfolio } = useGetSingleStockPortfolio(symbol);
  const availableShares = portfolio?.quantity || 0;

  const { mutate: placeBuy, isPending: isBuying } = usePlaceBuyOrder();
  const { mutate: placeSell, isPending: isSelling } = usePlaceSellOrder();
  const { mutate: modifyGtt, isPending: isModifying } = useModifyOrder();

  const isPending = isBuying || isSelling || isModifying;
  const isBuy = selectedAction === "BUY";
  const isSell = selectedAction === "SELL";

  // Price calculations
  const effectivePrice =
    priceType === "LIMIT"
      ? Number(limitPrice) || 0
      : Number(triggerPrice) || live.price || 0;

  const totalAmount = Number(quantity || 0) * effectivePrice;

  // Validations
  const isExceedingShares = isSell && Number(quantity || 0) > availableShares;
  const isInsufficientBalance = isBuy && totalAmount > balance;

  // Percentage from market calculations
  const numTriggerPrice = Number(triggerPrice || 0);
  const triggerDiff = numTriggerPrice - (live.price || 0);
  const triggerPercent = live.price > 0 ? (triggerDiff / live.price) * 100 : 0;
  const triggerPercentText =
    numTriggerPrice > 0 && live.price > 0
      ? `${triggerPercent >= 0 ? "+" : ""}${triggerPercent.toFixed(2)}% from market`
      : "0% from market";

  const numLimitPrice = Number(limitPrice || 0);
  const limitDiff = numLimitPrice - (live.price || 0);
  const limitPercent = live.price > 0 ? (limitDiff / live.price) * 100 : 0;
  const limitPercentText =
    numLimitPrice > 0 && live.price > 0
      ? `${limitPercent >= 0 ? "+" : ""}${limitPercent.toFixed(2)}% from market`
      : "0% from market";

  const handleOrderSubmit = () => {
    const gttType = isBuy
      ? numTriggerPrice <= (live.price || 0)
        ? "TARGET"
        : "STOP_LOSS"
      : numTriggerPrice >= (live.price || 0)
        ? "TARGET"
        : "STOP_LOSS";

    if (isEditMode) {
      modifyGtt({
        orderId: editOrder.id,
        quantity: Number(quantity),
        triggerPrice: numTriggerPrice,
        gttType,
        action: selectedAction,
        limitPrice: priceType === "LIMIT" ? numLimitPrice : undefined,
      });
      return;
    }

    const payload = {
      stock,
      quantity: Number(quantity),
      type: "GTT",
      gttType,
      triggerPrice: numTriggerPrice,
      limitPrice: priceType === "LIMIT" ? numLimitPrice : undefined,
    };

    if (isBuy) {
      placeBuy(payload);
    } else if (isSell) {
      placeSell(payload);
    }
  };

  if (!stock) {
    return <div>No Stock Found</div>;
  }

  return (
    <div className="flex h-svh sm:h-[calc(100vh-83px)] sm:px-6 md:px-8 sm:border-x mx-auto flex-col pt-2 sm:mx-auto sm:max-w-2xl">
      <div className="px-4">
        {/* Header Title */}
        <div className="Title mt-4 flex items-center gap-2">
          <GoBackButton />
          <div>
            <h5 className="font-medium leading-tight">
              {stock.longName || stock.shortName || symbol}
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

        <div className="mt-8 space-y-6">
          {/* IF Block */}
          <div className="border rounded-2xl">
            <span className="py-3 px-4 tracking-widest block font-medium text-muted-foreground text-xs border-b">
              IF
            </span>
            <div className="p-4">
              <Field orientation="horizontal">
                <FieldLabel htmlFor="trigger-price" className="font-medium">
                  Price hits
                </FieldLabel>
                <Input
                  id="trigger-price"
                  type="number"
                  autoFocus={!isEditMode}
                  value={triggerPrice}
                  onChange={(e) => setTriggerPrice(e.target.value)}
                  className="w-1/2 text-right shadow-none"
                />
              </Field>
              <span className="text-xs mt-3 block text-muted-foreground text-right">
                {triggerPercentText}
              </span>
            </div>
          </div>

          {/* THEN Block */}
          <div className="border rounded-2xl">
            <div className="p-4 justify-between items-center flex">
              <span className="tracking-widest text-muted-foreground text-xs font-medium">
                THEN
              </span>
              <div className="space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "rounded-full shadow-none",
                    isBuy &&
                      "border-primary text-primary bg-primary/10 font-semibold",
                  )}
                  onClick={() => setSelectedAction("BUY")}
                >
                  Buy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "rounded-full shadow-none",
                    isSell &&
                      "border-destructive text-destructive bg-destructive/10 font-semibold",
                  )}
                  onClick={() => setSelectedAction("SELL")}
                >
                  Sell
                </Button>
              </div>
            </div>

            {/* FieldGroup shown only when an action (Buy or Sell) is selected */}
            {Boolean(selectedAction) && (
              <FieldGroup className="border-t p-4">
                <Field orientation="horizontal" invalid={isExceedingShares}>
                  <FieldLabel htmlFor="qty">Quantity</FieldLabel>
                  <div className="flex flex-col items-end w-1/2 gap-1">
                    <Input
                      id="qty"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      aria-invalid={isExceedingShares}
                      className="w-full text-right shadow-none"
                    />
                    {isSell && (
                      <span
                        className={cn(
                          "text-[11px]",
                          isExceedingShares
                            ? "text-destructive font-medium"
                            : "text-muted-foreground",
                        )}
                      >
                        {availableShares} available
                      </span>
                    )}
                  </div>
                </Field>

                <div>
                  <Field orientation="horizontal">
                    <FieldLabel htmlFor="price-type" className="gap-0">
                      Price
                      <Select
                        value={priceType}
                        onValueChange={(val) => setPriceType(val)}
                      >
                        <SelectTrigger
                          icon={<ChevronsUpDownIcon />}
                          className="w-fit border-none shadow-none font-medium"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl [&_[data-slot=select-item]]:rounded-lg">
                          <SelectGroup>
                            <SelectItem value="MARKET">Market</SelectItem>
                            <SelectItem value="LIMIT">Limit</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FieldLabel>
                    <Input
                      id="price-type"
                      type="number"
                      disabled={priceType === "MARKET"}
                      value={priceType === "LIMIT" ? limitPrice : ""}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      placeholder={priceType === "MARKET" ? "At Market" : ""}
                      className="w-1/2 text-right disabled:bg-accent shadow-none"
                    />
                  </Field>

                  {priceType === "LIMIT" && numLimitPrice > 0 && (
                    <span className="text-xs block mt-3 text-muted-foreground text-right">
                      {limitPercentText}
                    </span>
                  )}
                </div>
              </FieldGroup>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Submit */}
      <div className="mt-auto sm:mt-8 sm:gap-6 border-t p-4 flex flex-col gap-3 bg-background">
        {isBuy && isInsufficientBalance && (
          <p className="text-xs text-destructive font-medium text-center animate-in fade-in slide-in-from-bottom-1">
            You do not have sufficient balance
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Validity: 1 year</span>
          <span>Required: ₹{formatToINR(totalAmount)}</span>
        </div>

        <Button
          size="lg"
          variant={isSell ? "destructive" : "default"}
          disabled={
            isPending ||
            !selectedAction ||
            !quantity ||
            Number(quantity) <= 0 ||
            !triggerPrice ||
            Number(triggerPrice) <= 0 ||
            isInsufficientBalance ||
            isExceedingShares ||
            (priceType === "LIMIT" && (!limitPrice || Number(limitPrice) <= 0))
          }
          onClick={handleOrderSubmit}
        >
          {isEditMode ? "Update trigger order" : "Set trigger order"}
        </Button>
      </div>
    </div>
  );
}

export default TriggerOrderPage;
