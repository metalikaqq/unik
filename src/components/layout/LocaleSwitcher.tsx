"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALES, DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { cn } from "@/lib/cn";

const LABEL: Record<(typeof LOCALES)[number], string> = {
  en: "EN",
  uk: "UA",
};

interface LocaleSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function LocaleSwitcher({ className, compact }: LocaleSwitcherProps) {
  const pathname = usePathname() ?? "/";

  // Extract current locale + the rest of the path.
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const activeLocale = isLocale(first) ? first : DEFAULT_LOCALE;
  const rest = isLocale(first) ? segments.slice(1).join("/") : segments.join("/");

  return (
    <div
      className={cn(
        "glass inline-flex items-center rounded-full p-0.5",
        compact ? "text-[10px]" : "text-xs",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((loc) => {
        const href = rest ? `/${loc}/${rest}` : `/${loc}`;
        const active = loc === activeLocale;
        return (
          <Link
            key={loc}
            href={href}
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative font-mono uppercase tracking-wider transition-colors",
              compact ? "px-2 py-1" : "px-3 py-1.5",
              "rounded-full",
              active
                ? "bg-fg text-bg"
                : "text-muted hover:text-fg",
            )}
          >
            {LABEL[loc]}
          </Link>
        );
      })}
    </div>
  );
}
