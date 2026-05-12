import { getRequestConfig } from "next-intl/server";

import { isLocale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : routing.defaultLocale;

  const [common, home, speakers, schedule, tickets] = await Promise.all([
    import(`./locales/${locale}/common.json`).then((m) => m.default),
    import(`./locales/${locale}/home.json`).then((m) => m.default),
    import(`./locales/${locale}/speakers.json`).then((m) => m.default),
    import(`./locales/${locale}/schedule.json`).then((m) => m.default),
    import(`./locales/${locale}/tickets.json`).then((m) => m.default),
  ]);

  return {
    locale,
    messages: {
      common,
      home,
      speakers,
      schedule,
      tickets,
    },
  };
});
