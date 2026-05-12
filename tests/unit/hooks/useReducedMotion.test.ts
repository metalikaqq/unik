import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Listener = (event: { matches: boolean }) => void;

interface MockMediaQueryList {
  matches: boolean;
  media: string;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  __fire: (matches: boolean) => void;
}

function createMatchMedia(initial: boolean) {
  const listeners = new Set<Listener>();

  const mql: MockMediaQueryList = {
    matches: initial,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn((event: string, cb: Listener) => {
      if (event === "change") listeners.add(cb);
    }),
    removeEventListener: vi.fn((event: string, cb: Listener) => {
      if (event === "change") listeners.delete(cb);
    }),
    __fire: (matches: boolean) => {
      mql.matches = matches;
      for (const cb of listeners) cb({ matches });
    },
  };

  const matchMedia = vi.fn().mockReturnValue(mql);
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: matchMedia,
  });

  return { mql, matchMedia };
}

describe("useReducedMotion()", () => {
  let originalMatchMedia: typeof window.matchMedia | undefined;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    if (originalMatchMedia) {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: originalMatchMedia,
      });
    }
    vi.restoreAllMocks();
  });

  it("returns true when matchMedia matches reduce", () => {
    createMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns false when matchMedia does not match reduce", () => {
    createMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("queries the (prefers-reduced-motion: reduce) media feature", () => {
    const { matchMedia } = createMatchMedia(false);
    renderHook(() => useReducedMotion());
    expect(matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("updates value when the media query change event fires", () => {
    const { mql } = createMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
    act(() => {
      mql.__fire(true);
    });
    expect(result.current).toBe(true);
    act(() => {
      mql.__fire(false);
    });
    expect(result.current).toBe(false);
  });

  it("removes the change listener on unmount", () => {
    const { mql } = createMatchMedia(false);
    const { unmount } = renderHook(() => useReducedMotion());
    expect(mql.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    unmount();
    expect(mql.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    const addedListener = mql.addEventListener.mock.calls[0]?.[1];
    const removedListener = mql.removeEventListener.mock.calls[0]?.[1];
    expect(removedListener).toBe(addedListener);
  });
});
