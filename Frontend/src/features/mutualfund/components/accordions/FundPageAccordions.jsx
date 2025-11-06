import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronRightIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";
import ExpenseRatioExitLoad from "./ExpenseRatioExitLoad";
import FundHouseAndInvestmentObjective from "./FundHouseAndInvestmentObjective";
import ReturnAndRanking from "./ReturnAndRanking";
import ReturnCalculator from "../ReturnCalculator";
import SimilarFundsTableLG from "../tables/SimilarFundsTableLG";
import SimilarFundsTableSM from "../tables/SimilarFundsTableSM";

function FundPageAccordions({ fund }) {
  const isMobile = useIsMobile();

  return (
    <Accordion type="multiple" className="mt-10 border-t border-b">
      <AccordionItem value="item-1" className="px-4 py-3 sm:px-0 sm:py-4">
        <AccordionTrigger className="text-base sm:text-xl sm:font-semibold">
          Return Calculator
        </AccordionTrigger>
        <AccordionContent className="py-4">
          <ReturnCalculator fund={fund} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="px-4 py-3 sm:px-0 sm:py-4">
        <AccordionTrigger className="text-base sm:text-xl sm:font-semibold">
          Expense ratio, exit load & tax
        </AccordionTrigger>
        <AccordionContent className="py-4 pl-4">
          <ExpenseRatioExitLoad fund={fund} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="px-4 py-3 sm:px-0 sm:py-4">
        <AccordionTrigger className="text-base sm:text-xl sm:font-semibold">
          Returns & rankings
        </AccordionTrigger>
        <AccordionContent className="py-6">
          <ReturnAndRanking
            schemeCode={fund.scheme_code}
            fund_type={fund.fund_type}
            fund_category={fund.fund_category}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="py-3 sm:py-4">
        <AccordionTrigger className="px-4 text-base sm:px-0 sm:text-xl sm:font-semibold">
          Similar funds
        </AccordionTrigger>
        <AccordionContent className="py-4">
          {isMobile ? (
            <SimilarFundsTableSM fund={fund} />
          ) : (
            <SimilarFundsTableLG fund={fund} />
          )}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="px-4 py-3 sm:px-0 sm:py-4">
        <AccordionTrigger className="text-base sm:text-xl sm:font-semibold">
          Fund managers
        </AccordionTrigger>
        <AccordionContent className="mt-2 space-y-6">
          {fund.fund_manager?.split(";").map((manager, idx) => (
            <Link
              to={`/mutual-funds/fund-manager/${manager}`}
              key={idx}
              className="ml-2 flex items-center gap-2"
            >
              <Avatar className="border sm:size-10">
                <UserIcon className="text-muted-foreground m-auto size-full stroke-1 p-1.5 sm:p-2" />
              </Avatar>
              <span className="ml-2 sm:text-base sm:font-[450]">{manager}</span>
              <ChevronRightIcon className="text-primary ml-auto size-5" />
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="px-4 py-3 sm:px-0 sm:py-4">
        <AccordionTrigger className="text-base sm:text-xl sm:font-semibold">
          Fund house & investment objective
        </AccordionTrigger>
        <AccordionContent className="sm:mt-8">
          <FundHouseAndInvestmentObjective fund={fund} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FundPageAccordions;
