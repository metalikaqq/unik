"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { Rule } from "@/components/ui/Rule";
import { Sheet } from "@/components/ui/Sheet";
import { Tag } from "@/components/ui/Tag";

const SIZES: ButtonSize[] = ["sm", "md", "lg"];
const VARIANTS: ButtonVariant[] = ["primary", "secondary", "ghost"];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-12">
      <header className="mb-6 flex items-baseline gap-4">
        <Tag>{id}</Tag>
        <h2 id={`${id}-heading`} className="font-display text-2xl uppercase tracking-wide">
          {title}
        </h2>
      </header>
      <div>{children}</div>
    </section>
  );
}

export function ComponentsShowcase() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 text-fg">
      <header className="mb-8">
        <Tag>phase-01</Tag>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-wide md:text-6xl">
          Design system / components
        </h1>
        <p className="mt-4 max-w-prose text-base text-muted">
          Internal showcase of every primitive shipped in PHASE-01. Gated to non-production
          environments only. Tab through the page to verify focus rings; resize the viewport to
          check responsive behavior.
        </p>
      </header>

      <Rule />

      <Section id="button" title="Button — 3 sizes × 3 variants">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-start gap-3">
              <Tag>{variant}</Tag>
              {SIZES.map((size) => (
                <Button
                  key={`${variant}-${size}`}
                  size={size}
                  variant={variant}
                  data-testid={`btn-${variant}-${size}`}
                >
                  {size.toUpperCase()} / {variant}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Rule />

      <Section id="tag" title="Tag — monospace uppercase label">
        <div className="flex flex-wrap items-center gap-3">
          <Tag>phase-01</Tag>
          <Tag>tokens</Tag>
          <Tag>primitives</Tag>
          <Tag>a11y</Tag>
        </div>
      </Section>

      <Rule />

      <Section id="rule" title="Rule — horizontal + vertical hairline">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm text-muted">horizontal</p>
            <Rule orientation="horizontal" />
          </div>
          <div>
            <p className="mb-2 text-sm text-muted">horizontal, draw-in</p>
            <Rule orientation="horizontal" drawIn />
          </div>
          <div className="flex items-stretch gap-6 h-24">
            <div className="text-sm text-muted">vertical →</div>
            <Rule orientation="vertical" />
            <div className="text-sm text-muted">← vertical, draw-in →</div>
            <Rule orientation="vertical" drawIn />
          </div>
        </div>
      </Section>

      <Rule />

      <Section id="marquee" title="MarqueeText — CSS keyframes, reduced-motion aware">
        <MarqueeText className="border-y border-fg py-3 font-display uppercase tracking-wide">
          <span className="inline-flex gap-12">
            <span>Unik 2026</span>
            <span aria-hidden="true">•</span>
            <span>Київ</span>
            <span aria-hidden="true">•</span>
            <span>Carpathian red</span>
            <span aria-hidden="true">•</span>
          </span>
        </MarqueeText>
      </Section>

      <Rule />

      <Section id="accordion" title="Accordion — keyboard-accessible, ARIA-correct">
        <Accordion>
          <AccordionItem itemId="item-1">
            <AccordionTrigger>What is Unik?</AccordionTrigger>
            <AccordionContent>
              <p className="max-w-prose">
                Unik is a Swiss-rigorous brutalist platform for the Ukrainian community. Square
                corners, hairline rules, single accent color (#E63946 Carpathian red).
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem itemId="item-2">
            <AccordionTrigger>Why design tokens?</AccordionTrigger>
            <AccordionContent>
              <p className="max-w-prose">
                One source of truth for color, type, space, motion, and z-index. No hardcoded
                visuals. Reduced-motion auto-zeroes every duration token at the root.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem itemId="item-3">
            <AccordionTrigger>How is accessibility enforced?</AccordionTrigger>
            <AccordionContent>
              <p className="max-w-prose">
                Every primitive ships with a 2px focus ring, ARIA wiring, and keyboard support. The
                /dev/components route is exercised at 375 / 768 / 1280 viewports with a
                zero-serious-axe-violation gate.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Rule />

      <Section id="sheet" title="Sheet — focus-trapped, Esc-dismissable">
        <Button
          data-testid="sheet-trigger"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
        >
          Open Sheet
        </Button>
        <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Demo Sheet">
          <p className="mb-4 max-w-prose">
            Focus is moved to the first focusable element on open. Tab cycles within the panel. Esc
            closes the Sheet. Backdrop click closes the Sheet. Focus returns to the trigger on
            close.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button data-testid="sheet-close" variant="primary" onClick={() => setSheetOpen(false)}>
              Close
            </Button>
            <Button variant="secondary" onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
          </div>
        </Sheet>
      </Section>
    </main>
  );
}
