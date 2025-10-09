import { UnderstandTermsInfo } from "../info/UnderstandTermsInfo";

function ExpenseRatioExitLoad({ fund }) {
  return (
    <ul className="mt-2 list-disc space-y-5 sm:list-none">
      <li>
        <h5 className="text-sm font-[450] sm:text-base sm:font-semibold">
          Expense ratio : {fund.expense_ratio}%
        </h5>
        <p className="text-muted-foreground sm:text-foreground mt-1 sm:mt-2 sm:text-base">
          Inclusive of GST
        </p>
      </li>
      <li>
        <h5 className="text-sm font-[450] sm:text-base sm:font-semibold">
          Portfolio turnover
        </h5>
        <p className="text-muted-foreground sm:text-foreground mt-1 sm:mt-2 sm:text-base">
          {parseFloat(fund.portfolio_turnover).toFixed(2) || "NA"}%
        </p>
      </li>
      <li>
        <h5 className="text-sm font-[450] sm:text-base sm:font-semibold">
          Exit load
        </h5>
        <p className="text-muted-foreground sm:text-foreground mt-1 sm:mt-2 sm:text-base">
          {fund.exit_load || "NA"}
        </p>
      </li>
      <li>
        <h5 className="text-sm font-[450] sm:text-base sm:font-semibold">
          Tax implications
        </h5>
        <p className="text-muted-foreground sm:text-foreground mt-1 text-sm/4.5 sm:mt-2 sm:text-base">
          Returns are taxed at 20%, if you redeem before one year. After 1 year,
          you are required to pay LTCG tax of 12.5% on returns of Rs 1.25 lakh+
          in a financial year.
        </p>
      </li>

      <div className="sm:text-md text-muted-foreground relative right-2 mt-4 flex items-center gap-2 sm:right-0 sm:font-medium">
        Understand terms <UnderstandTermsInfo />
      </div>
    </ul>
  );
}
export default ExpenseRatioExitLoad;
