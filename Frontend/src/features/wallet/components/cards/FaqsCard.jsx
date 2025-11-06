import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { walletFAQs } from "../../constants/faqs";

function FaqsCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader className="px-0">
          <CardTitle className="font-medium sm:text-xl sm:font-semibold">
            FAQ's
          </CardTitle>
        </CardHeader>

        <Accordion type="single" collapsible>
          {walletFAQs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="sm:text-md text-[0.9rem]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
      </CardContent>
    </Card>
  );
}
export default FaqsCard;
