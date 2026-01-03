import { cn } from "@/lib/utils";
import { OnigiriIcon } from "@phosphor-icons/react";
import {
  ChartPieIcon,
  ChartSplineIcon,
  OrbitIcon,
  Rotate3DIcon,
  ScanTextIcon,
} from "lucide-react";

const features = [
  {
    icon: ChartPieIcon,
    title: "MF Investing",
    description:
      "Invest in mutual funds using virtual money and experience real investing without financial risk.",
  },
  {
    icon: OrbitIcon,
    title: "Virtual SIPs",
    description:
      "Start SIPs in Mutual Funds and understand how SIP actually work, create, edit, delete SIPs.",
  },
  {
    icon: Rotate3DIcon,
    title: "Step-Up SIPs",
    description:
      "Periodically increase SIP amounts by a fixed value or percentage, similar to real-world step-up SIPs.",
  },
  {
    icon: ChartSplineIcon,
    title: "Track Portfolio",
    description:
      "View holdings, returns, and performance in a clean and intuitive dashboard.",
  },
  {
    icon: ScanTextIcon,
    title: "P2P Transfer",
    description:
      "Send, receive, and Scan & Pay your virtual money instantly—just like UPI.",
  },
  {
    icon: OnigiriIcon,
    title: "Groww App UI",
    description:
      "Simple, familiar UI inspired by Groww for an easy and distraction-free investing journey.",
  },
];

function Features({ className }) {
  return (
    <section
      id="features"
      className={cn(
        "flex max-w-7xl flex-col items-center justify-center px-4 sm:px-8",
        className,
      )}
    >
      <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-5xl">
        Experience Real Investing, in Virtual environment
      </h2>
      <div className="mx-auto mt-10 grid max-w-(--breakpoint-xl) gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}

export default Features;

function FeatureCard({ feature }) {
  return (
    <div className="shadow-accent/50 flex flex-col rounded-[1.25rem] border px-5 py-6 pb-8 transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-7 sm:pt-7 sm:pb-10">
      <div className="flex items-center gap-3 sm:gap-4">
        <feature.icon className="size-7 sm:size-9" />
        <h3 className="text-[1.063rem] font-medium sm:font-[550] md:text-[1.375rem]">
          {feature.title}
        </h3>
      </div>
      <p className="text-foreground/70 mt-3 text-[0.85rem] sm:mt-4 sm:text-base">
        {feature.description}
      </p>
    </div>
  );
}
