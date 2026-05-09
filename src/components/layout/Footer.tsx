import { getTranslations } from "next-intl/server";

const SOCIAL_LINKS = [
  { key: "twitter", href: "https://x.com/" },
  { key: "github", href: "https://github.com/" },
  { key: "email", href: "mailto:hello@carpathian.conf" },
] as const;

export async function Footer() {
  const t = await getTranslations("common.footer");

  return (
    <footer className="border-t border-fg/15">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono uppercase tracking-wider text-muted">
          {t("copyright")}
        </p>
        <p className="font-mono uppercase tracking-wider text-muted">
          {t("tagline")}
        </p>
        <ul className="flex items-center gap-4 font-mono uppercase tracking-wider">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-fg focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t(`social.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
