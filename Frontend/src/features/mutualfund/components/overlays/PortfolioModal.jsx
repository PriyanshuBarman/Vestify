import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { formatToINR } from "@/utils/formatters";
import { ChevronRightIcon, LogsIcon, MoveUpRightIcon } from "lucide-react";
import { Link } from "react-router";
import PurchaseBtns from "../PurchaseBtns";

function PortfolioModal({ fund, isOpen, onOpenChange }) {
  if (!fund) return null;

  return (
    <ResponsiveModal open={isOpen} onOpenChange={onOpenChange}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="flex-row justify-between border-b pb-6 sm:p-4">
          <ResponsiveModalTitle className="text-md max-w-3/4 font-normal sm:text-lg">
            <Link
              to={`/mutual-funds/${fund.schemeCode}`}
              className="flex items-center gap-2"
            >
              {fund.shortName} Fund
              <ChevronRightIcon className="size-4 text-inherit" />
            </Link>
          </ResponsiveModalTitle>
          <span className="font-medium">{formatToINR(fund.current, 2)}</span>
        </ResponsiveModalHeader>

        <Link
          to="/mutual-funds/redeem"
          state={fund}
          className="grid grid-cols-[auto_1fr] items-center pl-4"
        >
          <MoveUpRightIcon className="bg-muted-foreground text-background size-6 rounded-full p-1.5 shadow" />
          <span className="text-md border-b p-4">Redeem</span>
        </Link>
        <Link
          to="/mutual-funds/investment-details"
          state={fund}
          className="grid grid-cols-[auto_1fr] items-center pl-4"
        >
          <LogsIcon className="text-muted-foreground" />
          <span className="text-md border-b p-4">Investment details</span>
        </Link>

        <ResponsiveModalFooter className="mt-4 px-0 sm:hidden">
          <ResponsiveModalClose asChild>
            <PurchaseBtns schemeCode={fund.schemeCode} className="p-0" />
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default PortfolioModal;
