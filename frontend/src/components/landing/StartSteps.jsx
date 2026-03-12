import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    title: "Create Your Account",
    desc: "Sign up in seconds to join the platform.",
  },
  {
    num: "02",
    title: "Get Your Virtual Balance",
    desc: `Use the virtual balance to invest in funds.`,
  },
  {
    num: "03",
    title: "Start Investing Virtually",
    desc: "Allocate funds and watch your portfolio.",
  },
];

function StartSteps() {
  return (
    <section className="bg-landing text-background relative w-full overflow-hidden py-20 sm:py-32">
      {/* <div className="bg-grid-white absolute inset-0 z-0 opacity-40 mix-blend-overlay" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-center lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display mb-6 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            >
              Start in 3 simple steps
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg"
            >
              Three simple steps to start your investment learning journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-card/10 border-border/50 group relative overflow-hidden rounded-3xl border p-8 backdrop-blur-sm"
              >
                {/* Huge background number */}
                <span className="font-display text-muted/20 absolute -right-4 -bottom-8 text-[8rem] font-bold transition-transform duration-500 select-none group-hover:-translate-y-4">
                  {step.num}
                </span>

                <div className="relative z-10 flex h-full flex-col justify-between gap-12">
                  <span className="font-mono text-sm">Step {step.num}</span>
                  <div>
                    <h3 className="font-display mb-2 text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartSteps;
