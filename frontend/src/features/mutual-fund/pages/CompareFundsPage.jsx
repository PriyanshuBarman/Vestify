import GoBackBar from "@/components/GoBackBar";
import { SearchModal } from "@/components/overlays/SearchModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { formatToINR } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { CirclePlusIcon } from "lucide-react";
import { useState } from "react";
import { fetchFund } from "../api/external";

function CompareFundsPage() {
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const [selectedFunds, setSelectedFunds] = useState([null, null, null]);
  const [activeSearchIndex, setActiveSearchIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFundClick = (index) => {
    setActiveSearchIndex(index);
    setIsModalOpen(true);
  };

  const handleSelectFund = async (schemeCode) => {
    setIsModalOpen(false);
    try {
      const fund = await queryClient.fetchQuery({
        queryKey: ["fund", Number(schemeCode)],
        queryFn: () => fetchFund(schemeCode),
      });

      setSelectedFunds((prevFunds) => {
        const newFunds = [...prevFunds];
        newFunds[activeSearchIndex] = fund;
        return newFunds;
      });
    } catch (error) {
      console.error("Error selecting fund:", error);
    }
  };

  const slots = isMobile ? 2 : 3;

  return (
    <section className="pb-6">
      <GoBackBar title="Compare funds" showSearchIcon={false} />
      <div className="sm:overflow-hidden sm:rounded-3xl sm:border">
        <div className="bg-accent sticky top-14 grid h-28 grid-cols-2 border-b sm:top-0 sm:grid-cols-4">
          {!isMobile && (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <span className="font-semibold">Compare Funds</span>
            </div>
          )}
          {Array.from({ length: slots }).map((_, index) => (
            <div
              key={index}
              className="flex h-full flex-col items-center justify-center gap-2"
            >
              {selectedFunds[index] ? (
                <div className="text-center">
                  <h2 className="text-sm sm:text-base sm:font-medium">
                    {selectedFunds[index].short_name}
                  </h2>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAddFundClick(index)}
                  className="flex flex-col items-center gap-2 text-sm"
                >
                  <CirclePlusIcon className="size-6" />
                  Add a fund
                </button>
              )}
            </div>
          ))}
        </div>

        <SearchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectFund={handleSelectFund}
        />

        {/* Accordions */}
        <Accordion type="multiple" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="mx-4 sm:mx-8 sm:py-8 sm:text-base sm:font-bold">
              FUND DETAILS
            </AccordionTrigger>
            <AccordionContent>
              <ResponsiveRow
                label="Risk"
                slots={slots}
                values={selectedFunds.map((fund) => fund?.crisil_rating)}
              />
              <ResponsiveRow
                label="Rating"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? `${fund?.fund_rating} ★` : null,
                )}
              />
              <ResponsiveRow
                label="Expense Ratio"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? `${fund.expense_ratio}%` : null,
                )}
              />
              <ResponsiveRow
                label="NAV"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund
                    ? `${formatToINR(fund.nav?.nav, 1)} (${formatDate(fund.nav?.date, "dd-MMM-yyyy")})`
                    : null,
                )}
              />
              <ResponsiveRow
                label="Min SIP Amount"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? formatToINR(fund.sip_min) : null,
                )}
              />
              <ResponsiveRow
                label="Min Lumpsum Amount"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? formatToINR(fund.lump_min) : null,
                )}
              />
              <ResponsiveRow
                label="Fund Started"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? formatDate(fund.start_date, "dd-MMM-yyyy") : null,
                )}
              />
              <ResponsiveRow
                label="Fund Size"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? `${formatToINR(fund.aum / 10)} Cr` : null,
                )}
              />
              <ResponsiveRow
                label="Exit Load"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? `${fund.exit_load}` : null,
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="mx-4 sm:mx-8 sm:py-8 sm:text-base sm:font-bold">
              RETURNS
            </AccordionTrigger>
            <AccordionContent>
              <ResponsiveRow
                label="1Y"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? `${fund.return_1y}%` : null,
                )}
              />
              <ResponsiveRow
                label="3Y"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? `${fund.return_3y}%` : null,
                )}
              />
              <ResponsiveRow
                label="5Y"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? `${fund.return_5y}%` : null,
                )}
              />
              <ResponsiveRow
                label="Since Inception"
                slots={slots}
                values={selectedFunds.map((fund) =>
                  fund ? `${fund.return_since_inception}%` : null,
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

export default CompareFundsPage;

function ResponsiveRow({ label, values, slots }) {
  return (
    <div className="border-muted grid grid-cols-2 border-b sm:min-h-18 sm:grid-cols-4 sm:text-base">
      {/* Label column */}
      <h4 className="bg-accent col-span-2 flex items-center justify-center py-6 font-medium sm:col-span-1 sm:ml-8 sm:h-full sm:justify-start sm:border-r sm:bg-transparent sm:py-4 sm:font-semibold">
        {label}
      </h4>

      {/* Fund slots */}
      {Array.from({ length: slots }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-center border-r-2 p-4 text-center sm:border-r"
        >
          {values[index] ?? "-"}
        </div>
      ))}
    </div>
  );
}
