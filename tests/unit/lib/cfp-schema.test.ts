import { describe, expect, it } from "vitest";

import { CFP_TRACKS, cfpSchema, type CfpValues } from "@/lib/cfp-schema";

const valid: CfpValues = {
  name: "Olena Shevchenko",
  email: "olena@example.com",
  title: "How we shipped Carpathian.conf",
  abstract:
    "A pragmatic field report on running a 3-day independent conference in a small mountain city — logistics, sponsors, and what we wish we knew.",
  track: "design",
};

describe("cfpSchema", () => {
  it("accepts a fully valid submission", () => {
    const result = cfpSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects an empty name with the name-required error key", () => {
    const result = cfpSchema.safeParse({ ...valid, name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "name");
      expect(issue?.message).toBe("errors.name.required");
    }
  });

  it("trims surrounding whitespace from the name and accepts it", () => {
    const result = cfpSchema.safeParse({ ...valid, name: "   Olena   " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Olena");
    }
  });

  it("rejects a whitespace-only name as required", () => {
    const result = cfpSchema.safeParse({ ...valid, name: "   " });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "name");
      expect(issue?.message).toBe("errors.name.required");
    }
  });

  it("rejects an empty email with the email-required key", () => {
    const result = cfpSchema.safeParse({ ...valid, email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "email");
      expect(issue?.message).toBe("errors.email.required");
    }
  });

  it("rejects a malformed email with the email-invalid key", () => {
    const result = cfpSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "email");
      expect(issue?.message).toBe("errors.email.invalid");
    }
  });

  it("rejects an empty title with the title-required key", () => {
    const result = cfpSchema.safeParse({ ...valid, title: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "title");
      expect(issue?.message).toBe("errors.title.required");
    }
  });

  it("rejects an abstract shorter than 50 characters", () => {
    const result = cfpSchema.safeParse({ ...valid, abstract: "too short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "abstract");
      expect(issue?.message).toBe("errors.abstract.min");
    }
  });

  it("rejects an abstract longer than 1000 characters", () => {
    const result = cfpSchema.safeParse({ ...valid, abstract: "x".repeat(1001) });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "abstract");
      expect(issue?.message).toBe("errors.abstract.max");
    }
  });

  it("accepts abstracts at the 50 and 1000 character boundaries", () => {
    expect(cfpSchema.safeParse({ ...valid, abstract: "x".repeat(50) }).success).toBe(true);
    expect(cfpSchema.safeParse({ ...valid, abstract: "x".repeat(1000) }).success).toBe(true);
  });

  it("accepts all three known track values", () => {
    for (const track of CFP_TRACKS) {
      const result = cfpSchema.safeParse({ ...valid, track });
      expect(result.success, `expected ${track} to be accepted`).toBe(true);
    }
  });

  it("rejects an unknown track value with the track-required key", () => {
    const result = cfpSchema.safeParse({ ...valid, track: "marketing" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "track");
      expect(issue?.message).toBe("errors.track.required");
    }
  });

  it("rejects an empty track with the track-required key", () => {
    const result = cfpSchema.safeParse({ ...valid, track: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === "track");
      expect(issue?.message).toBe("errors.track.required");
    }
  });
});
