"use client";

import { useEffect, useRef } from "react";

export function useEscapeKey(onEscape: () => void): void {
  const callbackRef = useRef(onEscape);

  useEffect(() => {
    callbackRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    const handler = (event: KeyboardEvent): void => {
      if (event.key === "Escape") callbackRef.current();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
