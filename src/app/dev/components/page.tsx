import { notFound } from "next/navigation";

import { ComponentsShowcase } from "./showcase";

export const dynamic = "force-static";
export const metadata = {
  title: "Design System / Components — Unik",
  description: "Internal design-system showcase. Not for production.",
  robots: { index: false, follow: false },
};

export default function ComponentsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <ComponentsShowcase />;
}
