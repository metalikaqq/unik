"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

type FaqView = {
  id: string;
  question: string;
  answer: string;
};

export type FaqProps = {
  entries: ReadonlyArray<FaqView>;
};

export function Faq({ entries }: FaqProps) {
  return (
    <Accordion singleOpen className="border-t border-fg/15">
      {entries.map((entry) => (
        <AccordionItem key={entry.id} itemId={entry.id} className="border-fg/15">
          <AccordionTrigger className="px-0">{entry.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-base leading-relaxed text-fg/85">{entry.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
