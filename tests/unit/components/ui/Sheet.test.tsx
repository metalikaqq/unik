import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Sheet } from "@/components/ui/Sheet";

function setMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockReturnValue({
      matches,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    }),
  });
}

function Harness({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <button data-testid="trigger" onClick={() => setOpen(true)}>
        Open
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Cart">
        <button data-testid="inside-1">Inside 1</button>
        <button data-testid="inside-2">Inside 2</button>
        <button data-testid="inside-3">Inside 3</button>
      </Sheet>
    </>
  );
}

describe("<Sheet />", () => {
  let originalMatchMedia: typeof window.matchMedia | undefined;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    // Default: reduced motion ON, so framer-motion transitions resolve instantly
    // and test timing stays deterministic. Override per-test where needed.
    setMatchMedia(true);
  });

  afterEach(() => {
    cleanup();
    if (originalMatchMedia) {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: originalMatchMedia,
      });
    }
    vi.restoreAllMocks();
  });

  it("renders nothing when open=false", () => {
    render(
      <Sheet open={false} onClose={() => {}} title="Cart">
        <span>body</span>
      </Sheet>
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders dialog with role, aria-modal, and aria-labelledby pointing to the title element", () => {
    render(
      <Sheet open onClose={() => {}} title="Cart">
        <span>body</span>
      </Sheet>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const labelId = dialog.getAttribute("aria-labelledby");
    expect(labelId).toBeTruthy();
    const title = document.getElementById(labelId as string);
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe("Cart");
  });

  it("moves focus to the first focusable inside the panel when opened", () => {
    render(<Harness />);
    const trigger = screen.getByTestId("trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
    fireEvent.click(trigger);
    expect(document.activeElement).toBe(screen.getByTestId("inside-1"));
  });

  it("returns focus to the previously focused element when closed (Escape)", () => {
    render(<Harness />);
    const trigger = screen.getByTestId("trigger");
    trigger.focus();
    fireEvent.click(trigger);
    expect(document.activeElement).toBe(screen.getByTestId("inside-1"));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes on Escape via useEscapeKey", () => {
    const onClose = vi.fn();
    render(
      <Sheet open onClose={onClose} title="Cart">
        <button>x</button>
      </Sheet>
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when open=false", () => {
    const onClose = vi.fn();
    render(
      <Sheet open={false} onClose={onClose} title="Cart">
        <button>x</button>
      </Sheet>
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on backdrop click", () => {
    const onClose = vi.fn();
    render(
      <Sheet open onClose={onClose} title="Cart">
        <button>x</button>
      </Sheet>
    );
    const backdrop = document.querySelector("[data-sheet-backdrop]");
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT close when clicking inside the panel content", () => {
    const onClose = vi.fn();
    render(
      <Sheet open onClose={onClose} title="Cart">
        <button data-testid="inner">x</button>
      </Sheet>
    );
    fireEvent.click(screen.getByTestId("inner"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("traps focus: Tab from the last focusable wraps to the first", () => {
    render(
      <Sheet open onClose={() => {}} title="Cart">
        <button data-testid="a">A</button>
        <button data-testid="b">B</button>
        <button data-testid="c">C</button>
      </Sheet>
    );
    const a = screen.getByTestId("a");
    const c = screen.getByTestId("c");
    c.focus();
    fireEvent.keyDown(c, { key: "Tab" });
    expect(document.activeElement).toBe(a);
  });

  it("traps focus: Shift+Tab from the first focusable wraps to the last", () => {
    render(
      <Sheet open onClose={() => {}} title="Cart">
        <button data-testid="a">A</button>
        <button data-testid="b">B</button>
        <button data-testid="c">C</button>
      </Sheet>
    );
    const a = screen.getByTestId("a");
    const c = screen.getByTestId("c");
    a.focus();
    fireEvent.keyDown(a, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(c);
  });

  it("applies inert attribute on body siblings while open and removes when closed", () => {
    const { rerender } = render(
      <Sheet open={false} onClose={() => {}} title="Cart">
        <span>body</span>
      </Sheet>
    );
    const tlContainer = document.body.children[0];
    expect(tlContainer).toBeDefined();
    expect(tlContainer?.hasAttribute("inert")).toBe(false);

    rerender(
      <Sheet open onClose={() => {}} title="Cart">
        <span>body</span>
      </Sheet>
    );
    const siblings = Array.from(document.body.children).filter(
      (c) => !c.hasAttribute("data-sheet-root")
    );
    expect(siblings.length).toBeGreaterThan(0);
    for (const c of siblings) {
      expect(c.hasAttribute("inert")).toBe(true);
    }

    rerender(
      <Sheet open={false} onClose={() => {}} title="Cart">
        <span>body</span>
      </Sheet>
    );
    const siblingsAfter = Array.from(document.body.children).filter(
      (c) => !c.hasAttribute("data-sheet-root")
    );
    for (const c of siblingsAfter) {
      expect(c.hasAttribute("inert")).toBe(false);
    }
  });

  it("emits a data-reduced-motion attribute reflecting useReducedMotion", () => {
    setMatchMedia(true);
    const { unmount } = render(
      <Sheet open onClose={() => {}} title="Cart">
        <span>body</span>
      </Sheet>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("data-reduced-motion")).toBe("true");
    unmount();

    setMatchMedia(false);
    render(
      <Sheet open onClose={() => {}} title="Cart">
        <span>body</span>
      </Sheet>
    );
    const dialog2 = screen.getByRole("dialog");
    expect(dialog2.getAttribute("data-reduced-motion")).toBe("false");
  });
});
