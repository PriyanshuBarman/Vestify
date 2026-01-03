import { cn } from "@/lib/utils";
import MarqueeLogos from "../MarqueeLogos";

function AmcMarquee({ className }) {
  return (
    <section className={cn("max-w-9xl w-full overflow-hidden px-4", className)}>
      <h2 className="text-center text-[1.37rem] font-semibold tracking-tight sm:text-5xl">
        Invest in India's top Mutual Funds
      </h2>
      <p className="text-md sm:text-foreground text-muted-foreground mt-2 text-center font-medium sm:mt-6 sm:text-xl">
        1550+ Direct Mutual Funds
      </p>
      <div className="mt-6 space-y-2 sm:mt-16 sm:space-y-8">
        <MarqueeLogos />
        <MarqueeLogos reverse />
      </div>
    </section>
  );
}
export default AmcMarquee;
