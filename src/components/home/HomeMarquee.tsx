import { getTranslations } from "next-intl/server";

import { MarqueeText } from "@/components/ui/MarqueeText";

export async function HomeMarquee() {
  const t = await getTranslations("home.marquee");
  return (
    <div aria-hidden="true" className="border-y border-fg/15 py-[var(--space-6)]">
      <MarqueeText className="font-display text-2xl font-medium uppercase tracking-wide md:text-3xl">
        {t("line")}
      </MarqueeText>
    </div>
  );
}
