import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/faqs";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

function Faqs({ className }) {
  const isMobile = useIsMobile();
  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: isMobile ? 1.8 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="faqs"
      className={cn(
        "flex w-full max-w-7xl items-center justify-center px-4",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center justify-between gap-y-6 md:flex-row">
        <motion.h2
          className="text-center text-2xl font-semibold tracking-tight sm:text-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideInLeft}
        >
          Questions And Answers
        </motion.h2>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-xl space-y-3 max-sm:mt-4 md:space-y-4"
        >
          {faqs.map(({ question, answer }, index) => (
            <FaqItem
              key={question}
              question={question}
              answer={answer}
              index={index}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FaqItem({ question, answer, index }) {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={itemVariants}
    >
      <AccordionItem
        value={`question-${index}`}
        className="bg-accent rounded-xl px-4 py-0.5 sm:pl-6"
      >
        <AccordionTrigger className="text-md text-left font-[450] sm:text-lg">
          {question}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground overflow-hidden text-[0.9rem] leading-relaxed text-balance sm:text-base">
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {answer}
          </motion.div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

export default Faqs;
