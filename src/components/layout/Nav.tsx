"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SECTIONS } from "@/lib/sections";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="Cosmos Atlas — home">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan via-violet to-magenta opacity-90 blur-[6px] transition-opacity group-hover:opacity-100" />
            <span className="relative h-2 w-2 rounded-full bg-fg" />
          </span>
          <span className="font-display text-sm uppercase tracking-wider text-fg">
            Cosmos<span className="text-muted">/</span>Atlas
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="hidden items-center gap-8 md:flex">
            {SECTIONS.map((section) => {
              const href = `/${section.slug}`;
              const active = pathname?.startsWith(href);
              return (
                <li key={section.slug}>
                  <Link
                    href={href}
                    className={cn(
                      "relative font-mono text-xs uppercase tracking-wider transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {section.title}
                    {active ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-cyan to-magenta" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="flex items-center gap-4 md:hidden">
            {SECTIONS.map((section) => (
              <li key={section.slug}>
                <Link
                  href={`/${section.slug}`}
                  className="font-mono text-[10px] uppercase tracking-wider text-muted hover:text-fg"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}
