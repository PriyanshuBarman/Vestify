import { containerVariants, itemVariants } from "@/constants/animations";
import { features } from "@/constants/landing/features";
import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";

function Features() {
  return (
    <section className="bg-secondary/25 w-full py-16 max-sm:mask-t-from-95% sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          subheading="Features"
          heading="Everything that you can do in a real investing app"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid auto-rows-min grid-cols-12 gap-4 md:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 300 },
              }}
              className={`${feature.span} group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 ${
                feature.isFill
                  ? "bg-card sm:bg-landing sm:text-primary-foreground border"
                  : "bg-card border"
              }`}
            >
              <feature.icon
                className={`mb-6 size-11 rounded-xl p-3 sm:size-12 ${feature.isFill ? "sm:text-landing bg-accent sm:bg-background" : "bg-accent"}`}
              />

              <div className="relative z-10">
                <h3 className="mb-3 text-2xl font-medium max-sm:text-lg">
                  {feature.title}
                </h3>
                <p
                  className={`${feature.isFill ? "text-muted-foreground sm:text-background" : "text-muted-foreground"} max-w-sm max-sm:text-sm`}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
