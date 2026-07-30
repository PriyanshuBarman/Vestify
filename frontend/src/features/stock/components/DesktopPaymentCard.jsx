import { useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveData } from "../hooks/useGetLiveData";
import { useGetSingleStockPortfolio } from "../hooks/useGetSingleStockPortfolio";
import { usePlaceBuyOrder } from "../hooks/usePlaceBuyOrder";
import { usePlaceSellOrder } from "../hooks/usePlaceSellOrder";
import { evaluateOrderValidation } from "../utils/orderValidationUtils";
import OrderErrorMessage from "./OrderErrorMessage";
import OrderTypePopover from "./overlays/OrderTypePopover";
import ProductTypeButtons from "./ProductTypeButtons";

function DesktopPaymentCard({ stock }) {
  const [activeTab, setActiveTab] = useState("BUY"); // "BUY" | "SELL" | "GTT
  const { price } = useGetLiveData(stock?.symbol);

  // Holdings & Wallet Balance
  const { data: portfolio } = useGetSingleStockPortfolio(stock?.symbol);
  const availableShares = portfolio?.quantity || 0;
  const { data: balance = 0 } = useGetBalance();

  // Order Mutations
  const { mutate: placeBuy, isPending: isBuying } = usePlaceBuyOrder();
  const { mutate: placeSell, isPending: isSelling } = usePlaceSellOrder();
  const isPending = isBuying || isSelling;

  if (!stock?.symbol) return null;

  return (
    <div className="bg-background fixed top-36 hidden h-[550px] w-[400px] rounded-3xl border p-5 lg:right-[2%] lg:flex xl:right-24 xl:flex-col">
      <Tabs
        value={activeTab}
        onValueChange={(tab) => setActiveTab(tab)}
        className="flex h-full w-full flex-col"
      >
        <TabsList className="ring-muted-foreground/20 mb-3 w-full bg-transparent ring">
          <TabsTrigger
            value="BUY"
            className="data-[state=active]:text-primary data-[state=active]:bg-primary/10 font-semibold"
          >
            BUY
          </TabsTrigger>
          <TabsTrigger
            value="SELL"
            className="data-[state=active]:text-destructive data-[state=active]:bg-destructive/10 font-semibold"
          >
            SELL
          </TabsTrigger>
          <TabsTrigger
            value="GTT"
            className="data-[state=active]:text-amber-500 data-[state=active]:bg-amber-500/10 font-semibold"
          >
            GTT
          </TabsTrigger>
        </TabsList>

        {/* Buy / Sell Tab Component */}
        {(activeTab === "BUY" || activeTab === "SELL") && (
          <BuySellOrderTab
            activeTab={activeTab}
            stock={stock}
            price={price}
            availableShares={availableShares}
            balance={balance}
            placeBuy={placeBuy}
            placeSell={placeSell}
            isPending={isPending}
          />
        )}

        {/* GTT Tab Component */}
        <GttOrderTab
          stock={stock}
          price={price}
          availableShares={availableShares}
          balance={balance}
          placeBuy={placeBuy}
          placeSell={placeSell}
          isPending={isPending}
        />
      </Tabs>
    </div>
  );
}

function BuySellOrderTab({
  activeTab,
  stock,
  price,
  availableShares,
  balance,
  placeBuy,
  placeSell,
  isPending,
}) {
  const [type, setType] = useState("REGULAR"); // "REGULAR" | "SL"
  const [priceType, setPriceType] = useState("MARKET"); // "MARKET" | "LIMIT"
  const [quantity, setQuantity] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");

  // Order Validation
  const {
    totalAmount,
    isExceedingShares,
    isInsufficientBalance,
    isInvalidBuyLimit,
    isInvalidSellLimit,
    isInvalidLimit,
    isInvalidSLTrigger,
    isInvalidOrder,
  } = evaluateOrderValidation({
    action: activeTab,
    type,
    priceType,
    limitPrice: Number(limitPrice) || 0,
    triggerPrice: Number(triggerPrice) || 0,
    quantity: Number(quantity) || 0,
    price,
    availableShares,
    balance,
  });

  const handleSubmit = () => {
    const payload = {
      stock,
      quantity: Number(quantity),
      type,
      limitPrice: limitPrice ? Number(limitPrice) : undefined,
      triggerPrice:
        activeTab === "SELL" && type === "SL"
          ? Number(triggerPrice)
          : undefined,
    };

    const resetInputs = () => {
      setQuantity("");
      setLimitPrice("");
      setTriggerPrice("");
    };

    if (activeTab === "BUY") {
      placeBuy(payload, { onSuccess: resetInputs });
    } else {
      placeSell(payload, { onSuccess: resetInputs });
    }
  };

  return (
    <TabsContent value={activeTab} className="flex flex-col mt-2 flex-1">
      <div className="flex items-center gap-2">
        <ProductTypeButtons />
        {activeTab === "SELL" && (
          <>
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <OrderTypePopover type={type} onTypeChange={setType} />
          </>
        )}
      </div>

      {/* Inputs */}
      <FieldGroup className="mt-8 space-y-3">
        <Field orientation="horizontal" invalid={isExceedingShares}>
          <FieldLabel htmlFor="desktop-qty">Quantity</FieldLabel>
          <div className="flex flex-col items-end w-1/2 gap-1">
            <Input
              id="desktop-qty"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              aria-invalid={isExceedingShares}
              className="w-full text-right shadow-none"
            />
            {activeTab === "SELL" && (
              <span
                className={cn(
                  "text-xs",
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

        {/* SL vs Regular Price Fields */}
        {type === "SL" && activeTab === "SELL" ? (
          <>
            <Field orientation="horizontal" invalid={isInvalidSLTrigger}>
              <FieldLabel
                htmlFor="desktop-trigger-price"
                className="font-medium"
              >
                SL Trigger Price
              </FieldLabel>
              <Input
                id="desktop-trigger-price"
                type="number"
                value={triggerPrice}
                onChange={(e) => setTriggerPrice(e.target.value)}
                aria-invalid={isInvalidSLTrigger}
                className="w-1/2 text-right shadow-none"
              />
            </Field>

            <Field orientation="horizontal" invalid={isInvalidLimit}>
              <FieldLabel htmlFor="desktop-price-type" className="gap-0">
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
                id="desktop-price-type"
                type="number"
                disabled={priceType === "MARKET"}
                value={priceType === "LIMIT" ? limitPrice : ""}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder={priceType === "MARKET" ? "At Market" : ""}
                aria-invalid={isInvalidLimit}
                className="w-1/2 text-right disabled:bg-accent shadow-none"
              />
            </Field>
          </>
        ) : (
          <Field orientation="horizontal" invalid={isInvalidLimit}>
            <FieldLabel htmlFor="desktop-price-type" className="gap-0">
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
              id="desktop-price-type"
              type="number"
              disabled={priceType === "MARKET"}
              value={priceType === "LIMIT" ? limitPrice : ""}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder={priceType === "MARKET" ? "At Market" : ""}
              aria-invalid={isInvalidLimit}
              className="w-1/2 text-right disabled:bg-accent shadow-none"
            />
          </Field>
        )}
      </FieldGroup>

      {/* Footer / Submit */}
      <div className="mt-auto pt-4 space-y-3 border-t">
        <OrderErrorMessage
          isBuy={activeTab === "BUY"}
          isInsufficientBalance={isInsufficientBalance}
          isInvalidBuyLimit={isInvalidBuyLimit}
          isInvalidSellLimit={isInvalidSellLimit}
          isInvalidSLTrigger={isInvalidSLTrigger}
          price={price}
        />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Available Balance: {formatToINR(balance)}</span>
          <span>Required: {formatToINR(totalAmount)}</span>
        </div>

        <Button
          size="lg"
          variant={activeTab === "SELL" ? "destructive" : "default"}
          disabled={isPending || isInvalidOrder}
          onClick={handleSubmit}
          className="w-full"
        >
          {isPending
            ? "Placing Order..."
            : activeTab === "BUY"
              ? "Buy"
              : "Sell"}
        </Button>
      </div>
    </TabsContent>
  );
}

function GttOrderTab({
  stock,
  price,
  availableShares,
  balance,
  placeBuy,
  placeSell,
  isPending,
}) {
  const [action, setAction] = useState(null); // "BUY" | "SELL" | null
  const [quantity, setQuantity] = useState("");
  const [priceType, setPriceType] = useState("MARKET"); // "MARKET" | "LIMIT"
  const [limitPrice, setLimitPrice] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");

  // Calculations
  const numTriggerPrice = Number(triggerPrice || 0);
  const numLimitPrice = Number(limitPrice || 0);
  const numQuantity = Number(quantity || 0);

  const triggerDiff = numTriggerPrice - (price || 0);
  const triggerPercent = price > 0 ? (triggerDiff / price) * 100 : 0;
  const triggerPercentText =
    numTriggerPrice > 0 && price > 0
      ? `${triggerPercent >= 0 ? "+" : ""}${triggerPercent.toFixed(2)}% from market`
      : "0% from market";

  const effectivePrice =
    priceType === "LIMIT" ? numLimitPrice || 0 : numTriggerPrice || price || 0;
  const totalAmount = numQuantity * effectivePrice;

  const isExceedingShares = action === "SELL" && numQuantity > availableShares;
  const isInsufficientBalance = action === "BUY" && totalAmount > balance;

  const isInvalidOrder =
    !action ||
    !numQuantity ||
    numQuantity <= 0 ||
    !numTriggerPrice ||
    numTriggerPrice <= 0 ||
    isInsufficientBalance ||
    isExceedingShares ||
    (priceType === "LIMIT" && (!limitPrice || numLimitPrice <= 0));

  const handleSubmit = () => {
    const isBuy = action === "BUY";
    const gttType = isBuy
      ? numTriggerPrice <= (price || 0)
        ? "TARGET"
        : "STOP_LOSS"
      : numTriggerPrice >= (price || 0)
        ? "TARGET"
        : "STOP_LOSS";

    const payload = {
      stock,
      quantity: numQuantity,
      type: "GTT",
      gttType,
      triggerPrice: numTriggerPrice,
      limitPrice: priceType === "LIMIT" ? numLimitPrice : undefined,
    };

    const resetInputs = () => {
      setQuantity("");
      setLimitPrice("");
      setTriggerPrice("");
      setAction(null);
    };

    if (isBuy) {
      placeBuy(payload, { onSuccess: resetInputs });
    } else {
      placeSell(payload, { onSuccess: resetInputs });
    }
  };

  return (
    <TabsContent value="GTT" className="flex flex-1 flex-col h-full mt-0">
      <div className="space-y-4 my-2">
        {/* IF Block */}
        <div className="border rounded-xl">
          <span className="py-2 px-3 tracking-widest block font-medium text-muted-foreground text-xs border-b">
            IF
          </span>
          <div className="p-3">
            <Field orientation="horizontal">
              <FieldLabel htmlFor="gtt-desktop-trigger" className="font-medium">
                Price hits
              </FieldLabel>
              <Input
                id="gtt-desktop-trigger"
                type="number"
                value={triggerPrice}
                onChange={(e) => setTriggerPrice(e.target.value)}
                className="w-1/2 text-right shadow-none"
              />
            </Field>
            <span className="text-xs mt-2 block text-muted-foreground text-right">
              {triggerPercentText}
            </span>
          </div>
        </div>

        {/* THEN Block */}
        <div className="border rounded-xl">
          <div className="p-3 justify-between items-center flex">
            <span className="tracking-widest text-muted-foreground text-xs font-medium">
              THEN
            </span>
            <div className="space-x-2">
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "rounded-full shadow-none h-7 px-3 text-xs",
                  action === "BUY" &&
                    "border-primary text-primary bg-primary/10 font-semibold",
                )}
                onClick={() => setAction("BUY")}
              >
                Buy
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "rounded-full shadow-none h-7 px-3 text-xs",
                  action === "SELL" &&
                    "border-destructive text-destructive bg-destructive/10 font-semibold",
                )}
                onClick={() => setAction("SELL")}
              >
                Sell
              </Button>
            </div>
          </div>

          {Boolean(action) && (
            <FieldGroup className="border-t p-3 space-y-3">
              <Field orientation="horizontal" invalid={isExceedingShares}>
                <FieldLabel htmlFor="gtt-desktop-qty">Quantity</FieldLabel>
                <div className="flex flex-col items-end w-1/2 gap-1">
                  <Input
                    id="gtt-desktop-qty"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    aria-invalid={isExceedingShares}
                    className="w-full text-right shadow-none"
                  />
                  {action === "SELL" && (
                    <span
                      className={cn(
                        "text-xs",
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

              <Field orientation="horizontal">
                <FieldLabel htmlFor="gtt-desktop-price-type" className="gap-0">
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
                  id="gtt-desktop-price-type"
                  type="number"
                  disabled={priceType === "MARKET"}
                  value={priceType === "LIMIT" ? limitPrice : ""}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  placeholder={priceType === "MARKET" ? "At Market" : ""}
                  className="w-1/2 text-right disabled:bg-accent shadow-none"
                />
              </Field>
            </FieldGroup>
          )}
        </div>
      </div>

      {/* Footer / Submit */}
      <div className="mt-auto pt-3 space-y-3 border-t">
        {action === "BUY" && isInsufficientBalance && (
          <p className="text-xs text-destructive font-medium text-center">
            You do not have sufficient balance
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Validity: 1 year</span>
          <span>Required: {formatToINR(totalAmount)}</span>
        </div>

        <Button
          size="lg"
          variant={action === "SELL" ? "destructive" : "default"}
          disabled={isPending || isInvalidOrder}
          onClick={handleSubmit}
          className="w-full"
        >
          {isPending ? "Placing Order..." : "Set trigger order"}
        </Button>
      </div>
    </TabsContent>
  );
}

export default DesktopPaymentCard;
