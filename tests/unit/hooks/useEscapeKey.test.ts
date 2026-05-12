import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useEscapeKey } from "@/hooks/useEscapeKey";

function fireKey(key: string): void {
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));
}

describe("useEscapeKey()", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("invokes the callback when Escape is pressed", () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(onEscape));
    fireKey("Escape");
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it("does NOT invoke the callback for non-Escape keys", () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(onEscape));
    fireKey("Enter");
    fireKey("Tab");
    fireKey("a");
    fireKey("Esc"); // legacy IE key — should be ignored, only "Escape" counts
    fireKey(" ");
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("removes its keydown listener on unmount", () => {
    const onEscape = vi.fn();
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useEscapeKey(onEscape));

    const addedKeydown = addSpy.mock.calls.find(([event]) => event === "keydown");
    expect(addedKeydown).toBeDefined();

    unmount();

    const removedKeydown = removeSpy.mock.calls.find(([event]) => event === "keydown");
    expect(removedKeydown).toBeDefined();
    expect(removedKeydown?.[1]).toBe(addedKeydown?.[1]);

    fireKey("Escape");
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("uses the latest callback when it changes between renders", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(({ cb }: { cb: () => void }) => useEscapeKey(cb), {
      initialProps: { cb: first },
    });

    fireKey("Escape");
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();

    rerender({ cb: second });
    fireKey("Escape");
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });
});
