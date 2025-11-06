import { InfoDrawer } from "@/components/InfoDrawer";

export function UnderstandTermsInfo() {
  return (
    <InfoDrawer title="Understand terms">
      <div className="space-y-6 text-sm">
        {/* Expense Ratio */}
        <div>
          <h4 className="text-foreground sm:text-md mb-2 font-medium">
            Expense ratio
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            A fee payable to a mutual fund house for managing your mutual fund
            investments. It is the total percentage of a company's fund assets
            used for administrative, management, advertising, and other
            expenses.
          </p>
        </div>

        {/* Portfolio Turnover */}
        <div>
          <h4 className="text-foreground sm:text-md mb-2 font-medium">
            Portfolio turnover
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            A measure of how frequently a fund manager buys and sells securities
            within the fund's portfolio. It is calculated as the percentage of
            the fund's holdings that have been replaced over a given period,
            typically expressed annually.
          </p>
        </div>

        {/* Exit Load */}
        <div>
          <h4 className="text-foreground sm:text-md mb-2 font-medium">
            Exit load
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            A fee payable to a mutual fund house for exiting a fund (fully or
            partially) before the completion of a specified period from the date
            of investment.
          </p>
        </div>

        {/* Tax */}
        <div>
          <h4 className="text-foreground sm:text-md mb-2 font-medium">Tax</h4>
          <p className="text-muted-foreground leading-relaxed">
            A percentage of your capital gains payable to the government upon
            exiting your mutual fund investments. Taxation is categorized as
            long-term capital gains (LTCG) and short-term capital gains (STCG)
            depending on your holding period and the type of fund.
          </p>
        </div>

        {/* Stamp Duty */}
        {/* <div>
          <h4 className="text-foreground mb-2 sm:text-md font-medium">Stamp duty</h4>
          <p className="text-muted-foreground leading-relaxed">
            A form of tax payable for the purchase or sale of an asset or
            security.
          </p>
        </div> */}
      </div>
    </InfoDrawer>
  );
}
