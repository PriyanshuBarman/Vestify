import { cn } from "@/lib/utils";
import { OnigiriIcon } from "@phosphor-icons/react";
import {
  ChartSplineIcon,
  OrbitIcon,
  Rotate3DIcon,
  ScanTextIcon,
  ShieldIcon,
} from "lucide-react";

const features = [
  {
    icon: ShieldIcon,
    title: "Virtual Investing",
    description:
      "Invest in mutual funds using virtual money and experience real investing without financial risk.",
  },
  {
    icon: OrbitIcon,
    title: "Start SIPs",
    description:
      "Start SIPs in Mutual Funds and understand how real SIPs work through an automated process.",
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
      "Track how your portfolio grows over time and experience how real investments perform in different market conditions.",
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
      <h2 className="text-center text-[1.37rem] leading-loose font-semibold tracking-tight sm:text-5xl">
        Experience Real Investing
      </h2>
      <p className="text-muted-foreground sm:text-foreground text-md text-center sm:text-xl">
        Invest in a fully virtual environment & experience real investing
      </p>
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
    <div
      key={feature.title}
      className="group relative flex flex-col overflow-hidden rounded-2xl border px-5 py-5 transition-transform duration-300 ease-in-out hover:scale-105 sm:p-6"
    >
      <div className="absolute -top-10 -right-8 size-32 rounded-full bg-gradient-to-t from-[#00b35c16] transition-transform duration-300 group-hover:scale-110 sm:size-36" />
      <div className="text-background flex w-fit items-center justify-center rounded-xl bg-gradient-to-b from-[#00b35cd9] to-[#00b35c64] p-3.5 shadow-lg">
        <feature.icon className="size-4.5 max-sm:stroke-[2.5px] sm:size-6.5" />
      </div>
      <span className="text-md mt-3 font-semibold sm:mt-4 sm:text-xl">
        {feature.title}
      </span>
      <p className="text-foreground/80 sm:text-md mt-1.5 text-sm sm:mt-2">
        {feature.description}
      </p>
    </div>
  );
}
