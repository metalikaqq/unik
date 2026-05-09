"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export type SheetPosition = "right" | "left" | "bottom" | "top";

export type SheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  position?: SheetPosition;
  className?: string;
  children: ReactNode;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const positionClasses: Record<SheetPosition, string> = {
  right: "right-0 top-0 h-full w-[min(28rem,100%)]",
  left: "left-0 top-0 h-full w-[min(28rem,100%)]",
  bottom: "bottom-0 left-0 w-full h-[min(28rem,100%)]",
  top: "top-0 left-0 w-full h-[min(28rem,100%)]",
};

const enterFrom: Record<SheetPosition, { x?: string; y?: string }> = {
  right: { x: "100%" },
  left: { x: "-100%" },
  bottom: { y: "100%" },
  top: { y: "-100%" },
};

const SHEET_ROOT_ATTR = "data-sheet-root";

export function Sheet({
  open,
  onClose,
  title,
  position = "right",
  className,
  children,
}: SheetProps) {
  const reduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEscapeKey(() => {
    if (open) onClose();
  });

  // Declared BEFORE the focus-restore effect so its cleanup (removing `inert`)
  // runs FIRST when `open` flips false. Browsers silently reject focus() on
  // descendants of an inert element; if focus-restore ran while siblings were
  // still inert, the trigger would never regain focus. JSDOM doesn't enforce
  // inert, which is why the unit test couldn't catch this — the design-system
  // E2E (US-008) does.
  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const root = overlayRef.current;
    const siblings = Array.from(document.body.children).filter((c) => c !== root);
    const previousInert = siblings.map((s) => s.hasAttribute("inert"));
    siblings.forEach((s) => s.setAttribute("inert", ""));
    return () => {
      siblings.forEach((s, i) => {
        if (!previousInert[i]) s.removeAttribute("inert");
      });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = (document.activeElement as HTMLElement | null) ?? null;
    const panel = panelRef.current;
    if (panel) {
      const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const target = focusables[0] ?? panel;
      target.focus();
    }
    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusables.length === 0) {
      e.preventDefault();
      panel.focus();
      return;
    }
    const first = focusables[0] as HTMLElement;
    const last = focusables[focusables.length - 1] as HTMLElement;
    const active = document.activeElement;
    const outsidePanel = !panel.contains(active as Node | null);
    if (e.shiftKey && (active === first || outsidePanel)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || outsidePanel)) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (typeof document === "undefined") return null;
  if (!open) return null;

  const enterInitial = enterFrom[position];
  const transition = { duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const };

  return createPortal(
    <div ref={overlayRef} {...{ [SHEET_ROOT_ATTR]: "" }} className="fixed inset-0 z-50">
      <motion.div
        data-sheet-backdrop
        onClick={handleBackdropClick}
        className="absolute inset-0 bg-fg/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.2 }}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-sheet-panel
        data-reduced-motion={reduced ? "true" : "false"}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          "absolute bg-bg text-fg p-6 outline-none overflow-auto",
          positionClasses[position],
          className
        )}
        initial={enterInitial}
        animate={{ x: 0, y: 0 }}
        transition={transition}
      >
        <h2 id={titleId} className="font-display text-xl uppercase tracking-wide mb-4">
          {title}
        </h2>
        {children}
      </motion.div>
    </div>,
    document.body
  );
}
