import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-24">
      <h1 className="font-display text-4xl uppercase tracking-tight">
        CARPATHIAN.CONF 2026
      </h1>
      <p className="text-base text-muted">
        14–16 / 05 / 2026 — Uzhhorod, Ukraine
      </p>
    </div>
  );
}
