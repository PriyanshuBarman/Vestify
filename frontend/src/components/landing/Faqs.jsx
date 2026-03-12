import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { itemVariants } from "@/constants/animations";
import { faqs } from "@/constants/faqs";
import { motion } from "motion/react";

const slideInLeft = {
  hidden: { opacity: 0, x: -26 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Faqs() {
  return (
    <section className="w-full py-12 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between  px-4 sm:px-6 lg:flex-row md:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={slideInLeft}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl"
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
            className="w-full space-y-3 mt-12 lg:ml-auto lg:w-xl lg:space-y-4"
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
