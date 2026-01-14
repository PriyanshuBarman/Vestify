import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/faqs";
import { cn } from "@/lib/utils";

function Faqs({ className }) {
  return (
    <section
      id="faqs"
      className={cn(
        "flex w-full max-w-7xl items-center justify-center px-4",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center justify-between gap-y-6 md:flex-row">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-5xl">
          Questions And Answers
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-xl space-y-3 max-sm:mt-4 md:space-y-4"
        >
          {faqs.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="bg-accent rounded-xl px-4 py-0.5 sm:pl-6"
            >
              <AccordionTrigger className="text-md text-left font-[450] sm:text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-[0.9rem] leading-relaxed text-balance sm:text-base">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default Faqs;
