import { renderHook, act } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface CapturedObserver {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
  observed: Element[];
  disconnect: Mock<() => void>;
  observe: Mock<(target: Element) => void>;
  unobserve: Mock<(target: Element) => void>;
  fire: (entries: Array<Partial<IntersectionObserverEntry>>) => void;
  takeRecords: () => IntersectionObserverEntry[];
}

let captured: CapturedObserver[] = [];
let originalIO: typeof IntersectionObserver | undefined;

function installMockIO() {
  captured = [];
  originalIO = globalThis.IntersectionObserver;

  class MockIntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    private cb: IntersectionObserverCallback;
    private record: CapturedObserver;

    constructor(
      cb: IntersectionObserverCallback,
      options?: IntersectionObserverInit,
    ) {
      this.cb = cb;
      this.thresholds = Array.isArray(options?.threshold)
        ? (options!.threshold as number[])
        : options?.threshold !== undefined
          ? [options.threshold as number]
          : [];

      this.record = {
        callback: cb,
        options,
        observed: [],
        disconnect: vi.fn(),
        observe: vi.fn(),
        unobserve: vi.fn(),
        fire: (entries) => {
          this.cb(
            entries.map((e) => e as IntersectionObserverEntry),
            this as unknown as IntersectionObserver,
          );
        },
        takeRecords: () => [],
      };
      captured.push(this.record);
    }

    observe(target: Element): void {
      this.record.observed.push(target);
      this.record.observe(target);
    }
    unobserve(target: Element): void {
      this.record.unobserve(target);
    }
    disconnect(): void {
      this.record.disconnect();
    }
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    writable: true,
    value: MockIntersectionObserver,
  });
}

function restoreIO() {
  if (originalIO) {
    Object.defineProperty(globalThis, "IntersectionObserver", {
      configurable: true,
      writable: true,
      value: originalIO,
    });
  }
}

function makeEntry(
  topPx: number,
  heightPx: number,
  viewportHeightPx: number,
): Partial<IntersectionObserverEntry> {
  const visibleTop = Math.max(topPx, 0);
  const visibleBottom = Math.min(topPx + heightPx, viewportHeightPx);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  const ratio = heightPx > 0 ? visibleHeight / heightPx : 0;
  return {
    boundingClientRect: {
      top: topPx,
      bottom: topPx + heightPx,
      left: 0,
      right: 0,
      width: 0,
      height: heightPx,
      x: 0,
      y: topPx,
      toJSON: () => ({}),
    } as DOMRectReadOnly,
    rootBounds: {
      top: 0,
      bottom: viewportHeightPx,
      left: 0,
      right: 0,
      width: 0,
      height: viewportHeightPx,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRectReadOnly,
    intersectionRatio: ratio,
    isIntersecting: ratio > 0,
    target: document.createElement("div"),
    time: 0,
    intersectionRect: {} as DOMRectReadOnly,
  };
}

describe("useScrollProgress()", () => {
  beforeEach(() => {
    installMockIO();
  });

  afterEach(() => {
    restoreIO();
    vi.restoreAllMocks();
  });

  it("uses IntersectionObserver (NOT a scroll handler) to track progress", () => {
    const scrollSpy = vi.spyOn(window, "addEventListener");

    renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      const div = document.createElement("div");
      ref.current = div;
      return useScrollProgress(ref);
    });

    expect(captured.length).toBeGreaterThanOrEqual(1);

    const scrollAdds = scrollSpy.mock.calls.filter(
      ([event]) => event === "scroll",
    );
    expect(scrollAdds).toHaveLength(0);
  });

  it("creates the observer with multiple thresholds in [0, 1]", () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement("div");
      return useScrollProgress(ref);
    });

    expect(captured.length).toBeGreaterThanOrEqual(1);
    const observer = captured[0]!;
    const t = observer.options?.threshold;
    const thresholds = Array.isArray(t) ? t : t !== undefined ? [t] : [];
    expect(thresholds.length).toBeGreaterThan(2);
    for (const v of thresholds) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it("starts at 0 before any intersection event", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement("div");
      return useScrollProgress(ref);
    });
    expect(result.current).toBe(0);
  });

  it("observes the target element from the ref", () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement("div");
      return useScrollProgress(ref);
    });
    expect(captured[0]!.observe).toHaveBeenCalled();
  });

  it("clamps progress to the [0, 1] range", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement("div");
      return useScrollProgress(ref);
    });

    const observer = captured[0]!;

    // Element well below the viewport — progress should be 0.
    act(() => {
      observer.fire([makeEntry(2000, 500, 800)]);
    });
    expect(result.current).toBeGreaterThanOrEqual(0);
    expect(result.current).toBeLessThanOrEqual(1);

    // Element well above the viewport — progress should be 1.
    act(() => {
      observer.fire([makeEntry(-2000, 500, 800)]);
    });
    expect(result.current).toBeGreaterThanOrEqual(0);
    expect(result.current).toBeLessThanOrEqual(1);
  });

  it("reports monotone progress as the element scrolls past the viewport", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement("div");
      return useScrollProgress(ref);
    });

    const observer = captured[0]!;

    // Just entering the bottom of the viewport.
    act(() => {
      observer.fire([makeEntry(800, 500, 800)]);
    });
    const enter = result.current;

    // Centered in the viewport.
    act(() => {
      observer.fire([makeEntry(150, 500, 800)]);
    });
    const middle = result.current;

    // Just exiting the top of the viewport.
    act(() => {
      observer.fire([makeEntry(-500, 500, 800)]);
    });
    const exit = result.current;

    expect(enter).toBeLessThan(middle);
    expect(middle).toBeLessThan(exit);
    expect(enter).toBeGreaterThanOrEqual(0);
    expect(exit).toBeLessThanOrEqual(1);
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement("div");
      return useScrollProgress(ref);
    });

    expect(captured[0]!.disconnect).not.toHaveBeenCalled();
    unmount();
    expect(captured[0]!.disconnect).toHaveBeenCalled();
  });

  it("does nothing (no observer created) when the ref is null", () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return useScrollProgress(ref);
    });
    expect(captured.length).toBe(0);
  });

  it("falls back to intersectionRatio when rootBounds is null (cross-origin iframe)", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement("div");
      return useScrollProgress(ref);
    });

    const observer = captured[0]!;
    act(() => {
      observer.fire([
        {
          rootBounds: null,
          boundingClientRect: { height: 100, top: 0 } as DOMRectReadOnly,
          intersectionRatio: 0.42,
          isIntersecting: true,
          target: document.createElement("div"),
          time: 0,
          intersectionRect: {} as DOMRectReadOnly,
        },
      ]);
    });
    expect(result.current).toBeCloseTo(0.42, 5);
  });

  it("returns 0 when both viewport and element height are zero (degenerate case)", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement("div");
      return useScrollProgress(ref);
    });

    const observer = captured[0]!;
    act(() => {
      observer.fire([makeEntry(0, 0, 0)]);
    });
    expect(result.current).toBe(0);
  });

  it("ignores empty entry batches", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      ref.current = document.createElement("div");
      return useScrollProgress(ref);
    });

    const observer = captured[0]!;
    act(() => {
      observer.fire([makeEntry(100, 100, 800)]);
    });
    const beforeEmpty = result.current;

    act(() => {
      observer.fire([]);
    });
    expect(result.current).toBe(beforeEmpty);
  });
});
