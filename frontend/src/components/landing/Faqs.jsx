import { motion } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { itemVariants, slideInLeft } from "@/constants/animations";
import { faqs } from "@/constants/faqs";

function Faqs() {
  return (
    <section className="w-full py-12 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:px-6 md:px-8 lg:flex-row">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={slideInLeft}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center text-2xl font-medium tracking-tight sm:text-3xl md:text-6xl"
        >
          Questions And Answers
        </motion.h2>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full"
        >
          <Accordion
            type="single"
            collapsible
            className="mt-12 w-full space-y-3 lg:ml-auto lg:w-xl lg:space-y-4"
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
        </motion.div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer, index }) {
  return (
    <AccordionItem
      value={`question-${index}`}
      className="bg-accent rounded-xl px-4 py-0.5 sm:pl-6"
    >
      <AccordionTrigger className="text-md text-left font-normal sm:text-lg">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground overflow-hidden leading-relaxed text-balance sm:text-base">
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
  );
}

export default Faqs;
