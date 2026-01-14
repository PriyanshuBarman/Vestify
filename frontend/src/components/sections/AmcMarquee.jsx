import { cn } from "@/lib/utils";
import MarqueeLogos from "../MarqueeLogos";

function AmcMarquee({ className }) {
  return (
    <section className={cn("max-w-9xl w-full overflow-hidden px-4", className)}>
      <h2 className="flex flex-col text-center text-3xl font-semibold sm:text-[3.5rem]">
        Invest in India's top
        <span className="text-[#00b35c] italic">Mutual Funds</span>
      </h2>
      <p className="text-md text-muted-foreground mt-4 text-center sm:mt-8 sm:text-2xl">
        Learn real investing with virtual investing
      </p>
      <div className="mt-10 space-y-2 sm:mt-18 sm:space-y-8">
        <MarqueeLogos />
        <MarqueeLogos reverse />
      </div>
    </section>
  );
}
export default AmcMarquee;
