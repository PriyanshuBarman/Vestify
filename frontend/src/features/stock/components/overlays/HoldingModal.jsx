import { ChartPieIcon, ChevronRightIcon, LogsIcon } from "lucide-react";
import { Link } from "react-router";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { formatToINR } from "@/utils/formatters";

import { useGetLiveData } from "../../hooks/useGetLiveData";
import BuySellButtons from "../BuySellButtons";

function HoldingModal({ isOpen, onOpenChange, holding }) {
  const { price: livePrice } = useGetLiveData(holding?.symbol);

  if (!holding) return null;

  const quantity = Number(holding.quantity || 0);
  const invested = Number(holding.invested || 0);
  const avgPrice = quantity > 0 ? invested / quantity : 0;
  const currentMktPrice = livePrice || holding.currentPrice;
  const detailsPath = "/stocks/holding-details";

  return (
    <ResponsiveModal open={isOpen} onOpenChange={onOpenChange}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="sr-only">
          <ResponsiveModalTitle>Holding Details Modal</ResponsiveModalTitle>
          <ResponsiveModalDescription aria-hidden="true" />
        </ResponsiveModalHeader>

        <Item size="sm" className="tabular-nums">
          <ItemContent>
            <ItemTitle>
              <Link
                to={`/stocks/${holding.symbol}`}
                className="flex items-center gap-2"
              >
                {holding.name || holding.symbol}
                <ChevronRightIcon className="size-4" />
              </Link>
            </ItemTitle>
            <ItemDescription>
              Mkt {currentMktPrice ? formatToINR(currentMktPrice) : "-"}
            </ItemDescription>
          </ItemContent>

          <ItemContent className="items-end">
            <ItemTitle>{quantity} qty</ItemTitle>
            <ItemDescription>Avg {formatToINR(avgPrice)}</ItemDescription>
          </ItemContent>
        </Item>

        <div>
          <Link
            to={`/stocks/gtt-order/${holding.symbol}`}
            className="flex border-b items-center pl-4"
          >
            <ChartPieIcon className="text-muted-foreground size-5" />
            <span className="text-md p-4">Set trigger order</span>
          </Link>

          <Link
            to={detailsPath}
            state={{ holding }}
            className="flex border-b items-center pl-4"
          >
            <LogsIcon className="text-muted-foreground size-5" />
            <span className="text-md p-4">Holding details</span>
          </Link>
        </div>

        <ResponsiveModalFooter className="px-0">
          <BuySellButtons symbol={holding.symbol} />
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default HoldingModal;
