"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SECTIONS } from "@/lib/sections";
import { cn } from "@/lib/cn";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Nav() {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const locale = isLocale(first) ? first : DEFAULT_LOCALE;
  const rest = isLocale(first) ? "/" + segments.slice(1).join("/") : pathname;

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
        <Link
          href={`/${locale}`}
          className="group flex shrink-0 items-center gap-2 sm:gap-3"
          aria-label="Cosmos Atlas — home"
        >
          <span className="relative flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan via-violet to-magenta opacity-90 blur-[6px] transition-opacity group-hover:opacity-100" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-fg sm:h-2 sm:w-2" />
          </span>
          <span className="font-display text-xs uppercase tracking-wider text-fg sm:text-sm">
            Cosmos<span className="text-muted">/</span>Atlas
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 justify-center md:flex"
        >
          <ul className="flex items-center gap-6 lg:gap-8">
            {SECTIONS.map((section) => {
              const href = `/${locale}/${section.slug}`;
              const active = rest.startsWith(`/${section.slug}`);
              return (
                <li key={section.slug}>
                  <Link
                    href={href}
                    className={cn(
                      "relative font-mono text-xs uppercase tracking-wider transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {section.title[locale]}
                    {active ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-cyan to-magenta" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
        </div>
      </div>

      {/* Mobile section nav — second row */}
      <nav
        aria-label="Primary (mobile)"
        className="mx-auto block max-w-7xl border-t border-white/5 md:hidden"
      >
        <ul className="flex items-center justify-between gap-1 overflow-x-auto px-4 py-2 sm:px-8">
          {SECTIONS.map((section) => {
            const href = `/${locale}/${section.slug}`;
            const active = rest.startsWith(`/${section.slug}`);
            return (
              <li key={section.slug} className="shrink-0">
                <Link
                  href={href}
                  className={cn(
                    "block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors",
                    active
                      ? "bg-white/8 text-fg"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {section.title[locale]}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}
