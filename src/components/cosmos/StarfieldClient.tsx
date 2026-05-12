"use client";

import dynamic from "next/dynamic";

export const StarfieldClient = dynamic(
  () => import("./Starfield").then((m) => ({ default: m.Starfield })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(ellipse at top, rgba(139,92,255,0.15), transparent 60%), radial-gradient(ellipse at bottom, rgba(109,213,255,0.08), transparent 60%), #03020a",
        }}
        aria-hidden="true"
      />
    ),
  }
);
