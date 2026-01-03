import { cn } from "@/lib/utils";
import MarqueeLogos from "../MarqueeLogos";

function AmcMarquee({ className }) {
  return (
    <section className={cn("max-w-9xl w-full overflow-hidden", className)}>
      <h2 className="px-4 text-center text-2xl font-semibold tracking-tight sm:text-5xl">
        Invest in 1550+ Direct Mutual Funds
      </h2>
      <div className="mt-6 space-y-2 sm:mt-16 sm:space-y-8">
        <MarqueeLogos />
        <MarqueeLogos reverse />
      </div>
    </section>
  );
}
export default AmcMarquee;
