import { features } from "@/constants/features";
import { cn } from "@/lib/utils";

function Features({ className }) {
  return (
    <section
      id="features"
      className={cn(
        "flex max-w-7xl flex-col items-center justify-center px-4 sm:px-8",
        className,
      )}
    >
      <h2 className="max-w-[20ch] text-center text-2xl leading-snug font-semibold sm:max-w-[24ch] sm:text-5xl sm:leading-tight sm:tracking-tight">
        Experience Real Investing,{" "}
        <span className="tracking-tight text-[#00b35c] italic">
          in a Virtual environment
        </span>
      </h2>
      <p className="text-muted-foreground text-md mt-4 text-center max-sm:tracking-tight sm:text-2xl">
        Learn investing by actually doing it, safely.
      </p>
      <div className="mx-auto mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
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
      className={cn(
        "group bg-card relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:scale-101 active:scale-95 max-sm:shadow-xs sm:border sm:shadow-xs sm:hover:shadow-lg md:p-8 max-sm:dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
        feature.className,
      )}
    >
      {/* Floating Icon */}
      <div className="pointer-events-none absolute -top-6 -right-6 p-8 opacity-[0.025] transition-all duration-700 group-hover:scale-125 group-hover:-rotate-12 group-hover:opacity-[0.08] sm:opacity-[0.02]">
        <feature.icon className="size-26 md:size-28" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 inline-flex w-fit items-center justify-center rounded-2xl p-3.5 shadow transition-all duration-500 group-hover:rotate-[10deg] group-hover:shadow-md md:mb-8 md:p-4 dark:border-b">
          <feature.icon className="h-6 w-6 md:h-7 md:w-7" />
        </div>
        <h3 className="mb-2 text-[1.05rem] font-semibold transition-colors md:text-[1.35rem]">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-[0.9rem] transition-opacity group-hover:opacity-100 sm:opacity-80 md:text-[1.05rem]">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
