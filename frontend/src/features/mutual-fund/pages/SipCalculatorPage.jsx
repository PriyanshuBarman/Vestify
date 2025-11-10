import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@/hooks/useDebounce";
import { useMemo, useState } from "react";
import FutureValuePieChart from "../components/charts/FutureValuePieChart";
import { formatToINR } from "@/utils/formatters";
import { calcFutureValues } from "../utils/returnCalculatorHelper";

function SipCalculatorPage() {
  const [type, setType] = useState("sip");
  const [amount, setAmount] = useState(25000);
  const debouncedValue = useDebounce(amount, 900);
  const [years, setYears] = useState(10);
  const [annualReturn, setAnnualReturn] = useState(12);

  const result = useMemo(() => {
    return calcFutureValues(type, amount, annualReturn, years);
  }, [type, debouncedValue, years, annualReturn]);

  return (
    <>
      <GoBackBar title="SIP Calculator" />
      <div className="mt-4 px-4 lg:flex">
        <div className="lg:w-1/2">
          {/* Tab Buttons */}
          <section className="Tab-Buttons sm:space-x-4">
            <Button
              variant="ghost"
              onClick={() => setType("sip")}
              className={`sm:text-md hover:text-none rounded-full ${
                type === "sip"
                  ? "text-primary sm:ring-primary bg-primary/10 sm:ring"
                  : ""
              }`}
            >
              SIP
            </Button>
            <Button
              variant="ghost"
              onClick={() => setType("lumpsum")}
              className={`sm:text-md hover:text-none rounded-full ${
                type === "lumpsum"
                  ? "text-primary sm:ring-primary bg-primary/10 sm:ring"
                  : ""
              }`}
            >
              Lumpsum
            </Button>
          </section>

          {/* Sliders */}
          <section className="mt-8 space-y-10 sm:mt-12 sm:space-y-14">
            <SliderField
              label={type === "sip" ? "Monthly investment" : "Total investment"}
              value={amount}
              onChange={setAmount}
              min={100}
              max={type === "sip" ? 50000 : 100000}
              step={100}
              prefix="₹"
            />
            <SliderField
              label="Expected return rate (p.a)"
              value={annualReturn}
              onChange={setAnnualReturn}
              min={1}
              max={30}
              step={0.1}
              suffix="%"
            />
            <SliderField
              label="Time period"
              value={years}
              onChange={setYears}
              min={1}
              max={40}
              step={1}
              suffix="Yr."
            />
          </section>

          {/* Future values */}
          <FutureValuesSummary result={result} />
        </div>
        <FutureValuePieChart
          investedAmount={result?.invested}
          estReturn={result?.estReturn}
        />
      </div>
    </>
  );
}
export default SipCalculatorPage;

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h5 className="text-sm sm:text-base">{label}</h5>

        <label className="text-primary flex items-center gap-2 border-b">
          {prefix}
          <input
            type="number"
            inputMode="numeric"
            onChange={(e) => onChange(Number(e.target.value))}
            value={value}
            className="field-sizing-content text-lg font-semibold outline-none"
          />
          {suffix}
        </label>
      </div>
      <Slider
        className="cursor-pointer [&_[data-orientation=horizontal]]:h-1 [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 sm:[&_[role=slider]]:h-8 sm:[&_[role=slider]]:w-8 sm:[&_[role=slider]]:border-2"
        value={[value]}
        onValueChange={(newValue) => onChange(newValue[0])}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}

function FutureValuesSummary({ result }) {
  return (
    <section className="mt-12 space-y-4 md:mt-20">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm sm:text-base">
          Invested amount
        </span>
        <span>{formatToINR(result.invested)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm sm:text-base">
          Est. returns
        </span>
        <span>{formatToINR(result?.estReturn)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm sm:text-base">
          Total value
        </span>
        <span>{formatToINR(result?.futureValue)}</span>
      </div>
    </section>
  );
}
