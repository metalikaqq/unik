"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const t = useTranslations("common.localeSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider"
    >
      {routing.locales.map((locale, index) => {
        const isActive = locale === activeLocale;
        return (
          <span key={locale} className="contents">
            {index > 0 ? (
              <span aria-hidden="true" className="text-muted">
                /
              </span>
            ) : null}
            <button
              type="button"
              aria-current={isActive ? "true" : undefined}
              disabled={isActive || isPending}
              onClick={() => {
                startTransition(() => {
                  router.replace(pathname, { locale });
                });
              }}
              className={cn(
                "px-1 transition-colors focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive ? "text-fg" : "text-muted hover:text-accent disabled:opacity-60"
              )}
            >
              {locale === "uk" ? t("ukShort") : t("enShort")}
              <span className="sr-only">{locale === "uk" ? ` — ${t("uk")}` : ` — ${t("en")}`}</span>
            </button>
          </span>
        );
      })}
    </div>
  );
}
