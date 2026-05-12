export type ClassValue = string | number | false | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const tokens: string[] = [];
  collect(inputs, tokens);
  return tokens.join(" ");
}

function collect(value: ClassValue, out: string[]): void {
  if (!value) return;
  if (typeof value === "number") {
    out.push(String(value));
    return;
  }
  if (typeof value === "string") {
    for (const part of value.split(/\s+/)) {
      if (part) out.push(part);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collect(item, out);
  }
}
