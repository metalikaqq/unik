"use client";

import { createContext, useCallback, useContext, useId, useMemo, useState } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";

type AccordionContextValue = {
  openItems: ReadonlySet<string>;
  toggle: (id: string) => void;
  singleOpen: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("Accordion compound parts must be rendered inside <Accordion>");
  }
  return ctx;
}

type ItemContextValue = {
  itemId: string;
  triggerId: string;
  contentId: string;
  isOpen: boolean;
};

const ItemContext = createContext<ItemContextValue | null>(null);

function useAccordionItem(): ItemContextValue {
  const ctx = useContext(ItemContext);
  if (!ctx) {
    throw new Error("AccordionTrigger / AccordionContent must be rendered inside <AccordionItem>");
  }
  return ctx;
}

const TRIGGER_ATTR = "data-accordion-trigger";

export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
  singleOpen?: boolean;
  defaultOpen?: ReadonlyArray<string>;
  children: ReactNode;
};

export function Accordion({
  singleOpen = true,
  defaultOpen = [],
  children,
  className,
  onKeyDown,
  ...rest
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<ReadonlySet<string>>(() => {
    const initial = singleOpen ? defaultOpen.slice(0, 1) : defaultOpen;
    return new Set(initial);
  });

  const toggle = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          return next;
        }
        if (singleOpen) {
          next.clear();
        }
        next.add(id);
        return next;
      });
    },
    [singleOpen]
  );

  const ctx = useMemo<AccordionContextValue>(
    () => ({ openItems, toggle, singleOpen }),
    [openItems, toggle, singleOpen]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const target = event.target as HTMLElement | null;
    if (!target || !(target instanceof HTMLButtonElement)) return;
    if (!target.hasAttribute(TRIGGER_ATTR)) return;

    const triggers = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(`[${TRIGGER_ATTR}]`)
    );
    const currentIndex = triggers.indexOf(target);
    if (currentIndex === -1 || triggers.length === 0) return;

    let nextIndex: number;
    switch (event.key) {
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = triggers.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    triggers[nextIndex]?.focus();
  };

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn("flex flex-col", className)} onKeyDown={handleKeyDown} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  itemId?: string;
  children: ReactNode;
};

export function AccordionItem({ itemId, children, className, ...rest }: AccordionItemProps) {
  const ctx = useAccordion();
  const reactId = useId();
  const stateId = itemId ?? reactId;
  const triggerId = `${reactId}-trigger`;
  const contentId = `${reactId}-content`;
  const isOpen = ctx.openItems.has(stateId);

  const itemCtx = useMemo<ItemContextValue>(
    () => ({ itemId: stateId, triggerId, contentId, isOpen }),
    [stateId, triggerId, contentId, isOpen]
  );

  return (
    <ItemContext.Provider value={itemCtx}>
      <div
        data-accordion-item
        data-state={isOpen ? "open" : "closed"}
        className={cn("border-b border-fg", className)}
        {...rest}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
}

export type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function AccordionTrigger({
  children,
  className,
  onClick,
  type,
  ...rest
}: AccordionTriggerProps) {
  const acc = useAccordion();
  const item = useAccordionItem();

  return (
    <button
      {...{ [TRIGGER_ATTR]: "" }}
      type={type ?? "button"}
      id={item.triggerId}
      aria-expanded={item.isOpen}
      aria-controls={item.contentId}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        acc.toggle(item.itemId);
      }}
      className={cn(
        "flex w-full items-center justify-between gap-4 py-4 text-left",
        "font-display text-lg uppercase tracking-wide",
        "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function AccordionContent({ children, className, ...rest }: AccordionContentProps) {
  const item = useAccordionItem();

  return (
    <div
      role="region"
      id={item.contentId}
      aria-labelledby={item.triggerId}
      hidden={!item.isOpen}
      className={cn("pb-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
