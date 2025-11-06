import { InfoDrawer } from "@/components/InfoDrawer";

function SIPCalculationInfo() {
  return (
    <InfoDrawer
      title="How SIP Returns Are Calculated"
      triggerClassName="h-fit w-fit p-1"
    >
      <div className="space-y-4 text-sm">
        <p className="text-muted-foreground">
          This calculator shows what your returns would have been if you had
          started a SIP in this fund for the selected time period.
        </p>

        <div>
          <h4 className="mb-2 font-medium">Key Assumptions:</h4>
          <ul className="text-muted-foreground ml-2 space-y-1">
            <li>
              • SIP investment on the <strong>1st of every month</strong>
            </li>
            <li>• If 1st date of month is holiday, next available trading day is used</li>
            <li>• Exactly 12 monthly installments per year</li>
            <li>• Uses actual historical NAV data for calculations</li>
          </ul>
        </div>

        <div className="bg-muted/50 mt-8 rounded-lg p-3">
          <p className="text-muted-foreground text-xs">
            <strong>Example:</strong> For a 1-year SIP, we calculate returns
            from 12 monthly investments made on the 1st of each month over the
            past year.
          </p>
        </div>
      </div>
    </InfoDrawer>
  );
}
export default SIPCalculationInfo;
