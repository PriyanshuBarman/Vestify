import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { walletFAQs } from "@/constants/faqs";

function Faqs() {
  return (
    <section className="mt-10">
      <h2 className="ml-2 font-medium sm:text-xl sm:font-semibold">FAQ's</h2>

      <Accordion type="single" collapsible className="mt-4 space-y-3">
        {walletFAQs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-accent rounded-xl px-4"
          >
            <AccordionTrigger className="sm:text-md text-sm">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
export default Faqs;
