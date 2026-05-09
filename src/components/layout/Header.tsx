import { getTranslations } from "next-intl/server";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Link } from "@/i18n/navigation";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "speakers", href: "/speakers" },
  { key: "schedule", href: "/schedule" },
  { key: "tickets", href: "/tickets" },
  { key: "venue", href: "/venue" },
] as const;

export async function Header() {
  const t = await getTranslations("common");

  return (
    <header className="border-b border-fg/15">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-bg focus:px-3 focus:py-2 focus:text-fg focus:outline-solid focus:outline-2 focus:outline-accent"
      >
        {t("skipLink")}
      </a>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="font-display text-sm font-semibold uppercase tracking-wider text-fg hover:text-accent"
        >
          UNIK / 26
        </Link>
        <nav aria-label={t("nav.home")} className="hidden md:block">
          <ul className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-fg focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
