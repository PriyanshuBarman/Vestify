import { useState } from "react";
import {
  ChevronsUpDownIcon,
  ListChevronsUpDownIcon,
  SettingsIcon,
} from "lucide-react";
import { useLocation } from "react-router";

import { cn } from "@/lib/utils";
import { useGetBalance } from "@/hooks/useGetBalance";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
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
import GoBackButton from "@/components/GoBackButton";
import { formatToINR } from "@/utils/formatters";

import OrderErrorMessage from "../components/OrderErrorMessage";
import OrderTypeDrawer from "../components/overlays/OrderTypeDrawer";
import ProductTypeButtons from "../components/ProductTypeButtons";
import { useGetLiveData } from "../hooks/useGetLiveData";
import { useGetSingleStockPortfolio } from "../hooks/useGetSingleStockPortfolio";
import { useGetStockData } from "../hooks/useGetStockData";
import { useModifyOrder } from "../hooks/useModifyOrder";
import { usePlaceBuyOrder } from "../hooks/usePlaceBuyOrder";
import { usePlaceSellOrder } from "../hooks/usePlaceSellOrder";
import { useSubscribeStock } from "../hooks/useSubscribeStock";
import { evaluateOrderValidation } from "../utils/orderValidationUtils";

function BuySellPage() {
  const location = useLocation();

  const editOrder = location.state?.order;
  const isEditMode = Boolean(editOrder);

  const symbol = location.state?.symbol || editOrder?.symbol;
  const initialAction = location.state?.action || editOrder?.action || "BUY";
  const [action, setAction] = useState(initialAction);

  const [quantity, setQuantity] = useState(
    editOrder?.quantity?.toString() || "",
  );
  const [priceType, setPriceType] = useState(
    editOrder?.limitPrice ? "LIMIT" : "MARKET",
  );
  const [limitPrice, setLimitPrice] = useState(
    editOrder?.limitPrice?.toString() || "",
  );
  const [triggerPrice, setTriggerPrice] = useState(
    editOrder?.triggerPrice?.toString() || "",
  );
  const [type, setType] = useState(editOrder?.type || "REGULAR"); // "REGULAR" | "SL" | "GTT"
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOrderTypeChange = (newType) => {
    setType(newType);
    if (newType === "SL") {
      setAction("SELL");
    }
  };

  // Stock details & live price
  const { data: stock = {} } = useGetStockData(symbol);
  useSubscribeStock(symbol);
  const live = useGetLiveData(symbol, { fallback: stock });

  // Portfolio holdings for Sell validation
  const { data: portfolio } = useGetSingleStockPortfolio(symbol);
  const availableShares = portfolio?.quantity || 0;

  // User wallet balance
  const { data: balance = 0 } = useGetBalance();

  // Mutations
  const { mutate: placeBuy, isPending: isBuying } = usePlaceBuyOrder();
  const { mutate: placeSell, isPending: isSelling } = usePlaceSellOrder();
  const { mutate: modifyOrder, isPending: isModifying } = useModifyOrder();

  const isPending = isBuying || isSelling || isModifying;
  const isBuy = action === "BUY";
  const isSell = action === "SELL";

  // Calculations & validations
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
    action,
    type,
    priceType,
    limitPrice: Number(limitPrice) || 0,
    triggerPrice: Number(triggerPrice) || 0,
    quantity: Number(quantity) || 0,
    price: live.price,
    availableShares,
    balance,
  });

  const handleOrderSubmit = () => {
    if (isEditMode) {
      modifyOrder({
        orderId: editOrder.id,
        quantity: Number(quantity),
        type,
        action,
        limitPrice: priceType === "LIMIT" ? Number(limitPrice) : undefined,
        triggerPrice: type === "SL" ? Number(triggerPrice) : undefined,
      });
      return;
    }

    const payload = {
      stock,
      quantity: Number(quantity),
      type,
      limitPrice: limitPrice ? Number(limitPrice) : undefined,
      triggerPrice: type === "SL" ? Number(triggerPrice) : undefined,
    };

    if (isBuy) {
      placeBuy(payload);
    } else {
      placeSell(payload);
    }
  };

  return (
    <div className="flex px-4 h-svh sm:h-[calc(100vh-83px)] sm:px-6 md:px-8 sm:border-x  flex-col  pt-2 sm:mx-auto sm:pt-6 sm:max-w-2xl">
      <div>
        {/* Header Title */}
        <div className="mt-4 flex items-center gap-2">
          <GoBackButton className="-ml-2" />
          <div>
            <h5 className="font-medium leading-tight">
              {stock.longName || stock.shortName}
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

          <Button
            aria-label="Settings"
            size="icon"
            variant="ghost"
            className="ml-auto rounded-full"
            onClick={() => setIsSettingsOpen(true)}
          >
            <ListChevronsUpDownIcon />
          </Button>
        </div>

        {/* Sub Options */}
        <div className="mt-6 flex items-center gap-2">
          <ProductTypeButtons />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Button
            size="icon-sm"
            variant="outline"
            onClick={() => setIsSettingsOpen(true)}
            className="rounded-full"
          >
            <SettingsIcon />
          </Button>
        </div>

        {/* Order Inputs */}
        <div className="mt-8 sm:mt-12 sm:space-y-8 space-y-4">
          <Field orientation="horizontal" invalid={isExceedingShares}>
            <FieldLabel htmlFor="qty">Quantity</FieldLabel>
            <div className="flex flex-col items-end w-1/2 gap-1">
              <Input
                id="qty"
                type="number"
                min="1"
                autoFocus={!isEditMode}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                aria-invalid={isExceedingShares}
                className="w-full text-right shadow-none"
              />
              {isSell && (
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

          {/* Conditional Second & Third Input: SL Order vs Regular Market/Limit Select */}
          {type === "SL" ? (
            <>
              <Field orientation="horizontal" invalid={isInvalidSLTrigger}>
                <FieldLabel htmlFor="trigger-price" className="font-medium">
                  SL Trigger Price
                </FieldLabel>
                <Input
                  id="trigger-price"
                  type="number"
                  value={triggerPrice}
                  onChange={(e) => setTriggerPrice(e.target.value)}
                  aria-invalid={isInvalidSLTrigger}
                  className="w-1/2 text-right shadow-none"
                />
              </Field>

              <Field orientation="horizontal" invalid={isInvalidLimit}>
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
                  id="sl-limit-price"
                  type="number"
                  placeholder={priceType === "MARKET" && "At Market"}
                  disabled={priceType === "MARKET"}
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="w-1/2 text-right disabled:bg-accent shadow-none"
                />
              </Field>
            </>
          ) : (
            <Field orientation="horizontal" invalid={isInvalidLimit}>
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
                placeholder={priceType === "MARKET" && "At Market"}
                aria-invalid={isInvalidLimit}
                className="w-1/2 text-right disabled:bg-accent shadow-none"
              />
            </Field>
          )}
        </div>
      </div>

      {/* Footer / Submit */}
      <div className="mt-auto sm:mt-16 sm:gap-8 border-t py-4 flex flex-col gap-3 bg-background">
        {/* Error / Warning messages */}
        <OrderErrorMessage
          isBuy={isBuy}
          isInsufficientBalance={isInsufficientBalance}
          isInvalidBuyLimit={isInvalidBuyLimit}
          isInvalidSellLimit={isInvalidSellLimit}
          isInvalidSLTrigger={isInvalidSLTrigger}
          price={live.price}
        />

        <div className="flex items-center  justify-between text-xs text-muted-foreground">
          <span>Available Balance: {formatToINR(balance)}</span>
          <span>Required: {formatToINR(totalAmount)}</span>
        </div>

        <Button
          size="lg"
          variant={isSell ? "destructive" : "default"}
          disabled={isPending || isInvalidOrder}
          onClick={handleOrderSubmit}
          className="capitalize"
        >
          {isPending
            ? isEditMode
              ? `Updating ${action.toLowerCase()} order`
              : "Placing Order..."
            : isEditMode
              ? `Update ${action.toLowerCase()} order`
              : isBuy
                ? "Buy"
                : "Sell"}
        </Button>
      </div>

      <OrderTypeDrawer
        symbol={stock.symbol}
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        type={type}
        onTypeChange={handleOrderTypeChange}
      />
    </div>
  );
}

export default BuySellPage;
