import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { describe, expect, it } from "vitest";

import { routing } from "@/i18n/routing";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [k: string]: JsonValue }
  | JsonValue[];

const LOCALES_ROOT = join(process.cwd(), "src/i18n/locales");

function listJsonFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...listJsonFiles(full));
    } else if (name.endsWith(".json")) {
      out.push(full);
    }
  }
  return out;
}

function isPlainObject(value: JsonValue): value is { [k: string]: JsonValue } {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function collectKeys(value: JsonValue, prefix = ""): string[] {
  if (!isPlainObject(value)) {
    return prefix === "" ? [] : [prefix];
  }
  const out: string[] = [];
  for (const [key, child] of Object.entries(value)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(child)) {
      out.push(...collectKeys(child, next));
    } else {
      out.push(next);
    }
  }
  return out.sort();
}

function loadLocaleKeys(locale: string): Map<string, string[]> {
  const root = join(LOCALES_ROOT, locale);
  const files = listJsonFiles(root);
  const map = new Map<string, string[]>();
  for (const file of files) {
    const namespace = relative(root, file);
    const json = JSON.parse(readFileSync(file, "utf8")) as JsonValue;
    map.set(namespace, collectKeys(json));
  }
  return map;
}

describe("locale parity", () => {
  it("declares at least one locale beyond the default", () => {
    expect(routing.locales.length).toBeGreaterThan(1);
  });

  it("every locale has the same set of namespace files", () => {
    const perLocale = routing.locales.map((locale) => ({
      locale,
      namespaces: [...loadLocaleKeys(locale).keys()].sort(),
    }));
    const reference = perLocale[0];
    expect(reference).toBeDefined();
    if (!reference) return;
    for (const entry of perLocale) {
      expect(entry.namespaces).toEqual(reference.namespaces);
    }
  });

  it("every key in default locale exists in every other locale (and vice versa)", () => {
    const perLocale = new Map(
      routing.locales.map((locale) => [locale, loadLocaleKeys(locale)] as const)
    );
    const reference = perLocale.get(routing.defaultLocale);
    expect(reference).toBeDefined();
    if (!reference) return;

    for (const [locale, namespaces] of perLocale.entries()) {
      for (const [ns, keys] of namespaces.entries()) {
        const refKeys = reference.get(ns);
        expect(refKeys, `${locale}/${ns} has no counterpart in default locale`).toBeDefined();
        if (!refKeys) continue;
        const missing = refKeys.filter((k) => !keys.includes(k));
        const extra = keys.filter((k) => !refKeys.includes(k));
        expect(
          missing,
          `${locale}/${ns} missing keys present in default locale`
        ).toEqual([]);
        expect(
          extra,
          `${locale}/${ns} has extra keys not present in default locale`
        ).toEqual([]);
      }
    }
  });
});
