import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MarqueeText } from "@/components/ui/MarqueeText";

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

describe("<MarqueeText />", () => {
  let originalMatchMedia: typeof window.matchMedia | undefined;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
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

  it("renders the text content", () => {
    setMatchMedia(false);
    render(<MarqueeText>UNIK · CARPATHIANS · 2026</MarqueeText>);
    expect(screen.getAllByText("UNIK · CARPATHIANS · 2026").length).toBeGreaterThanOrEqual(1);
  });

  it("duplicates content for seamless wrap (default 3 copies)", () => {
    setMatchMedia(false);
    render(<MarqueeText>NOVA</MarqueeText>);
    expect(screen.getAllByText("NOVA")).toHaveLength(3);
  });

  it("respects a custom copies prop", () => {
    setMatchMedia(false);
    render(<MarqueeText copies={5}>BEAT</MarqueeText>);
    expect(screen.getAllByText("BEAT")).toHaveLength(5);
  });

  it("applies the marquee animation class on the track when motion is allowed", () => {
    setMatchMedia(false);
    const { container } = render(<MarqueeText>SCROLL</MarqueeText>);
    const track = container.querySelector("[data-marquee-track]");
    expect(track).not.toBeNull();
    expect(track?.className).toMatch(/animate-marquee/);
  });

  it("omits the animation class when prefers-reduced-motion: reduce", () => {
    setMatchMedia(true);
    const { container } = render(<MarqueeText>SCROLL</MarqueeText>);
    const track = container.querySelector("[data-marquee-track]");
    expect(track).not.toBeNull();
    expect(track?.className).not.toMatch(/animate-marquee/);
  });

  it("hides duplicated copies from assistive tech (only first copy is announced)", () => {
    setMatchMedia(false);
    const { container } = render(<MarqueeText>NOVA</MarqueeText>);
    const hidden = container.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBeGreaterThanOrEqual(2);
  });

  it("clips overflow on the outer wrapper to prevent horizontal scroll", () => {
    setMatchMedia(false);
    const { container } = render(<MarqueeText>x</MarqueeText>);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/overflow-hidden/);
  });

  it("forwards className to the outer wrapper", () => {
    setMatchMedia(false);
    const { container } = render(<MarqueeText className="custom-marquee">x</MarqueeText>);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/custom-marquee/);
  });
});
