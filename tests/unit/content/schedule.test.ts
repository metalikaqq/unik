import { describe, expect, it } from "vitest";

import { speakers } from "@/content/speakers";
import {
  DAY_DATES,
  formatDayDate,
  schedule,
  sessionSchema,
  sessionsForDay,
} from "@/content/schedule";

const speakerIds = new Set(speakers.map((s) => s.id));

const validSession = {
  id: "test-1",
  day: 1 as const,
  start: "09:00",
  end: "09:30",
  room: "Polonyna Hall",
  title: { uk: "Тестова сесія", en: "Test session" },
  abstract: { uk: "Опис", en: "Description" },
  track: "design" as const,
  kind: "talk" as const,
  speakerIds: ["olena-shevchenko"],
};

describe("sessionSchema", () => {
  it("accepts a valid session", () => {
    expect(sessionSchema.safeParse(validSession).success).toBe(true);
  });

  it("rejects an out-of-range time string", () => {
    expect(sessionSchema.safeParse({ ...validSession, start: "25:00" }).success).toBe(false);
  });

  it("rejects an unparseable time format", () => {
    expect(sessionSchema.safeParse({ ...validSession, start: "9am" }).success).toBe(false);
  });

  it("rejects a session whose start is not before end", () => {
    expect(sessionSchema.safeParse({ ...validSession, start: "10:00", end: "09:30" }).success).toBe(
      false
    );
  });

  it("rejects a session with an unknown day number", () => {
    expect(sessionSchema.safeParse({ ...validSession, day: 4 }).success).toBe(false);
  });

  it("rejects a session with no speaker references", () => {
    expect(sessionSchema.safeParse({ ...validSession, speakerIds: [] }).success).toBe(false);
  });
});

describe("schedule data", () => {
  it("validates every entry against the schema", () => {
    for (const entry of schedule) {
      const result = sessionSchema.safeParse(entry);
      expect(result.success, `${entry.id} failed validation`).toBe(true);
    }
  });

  it("has unique ids across the dataset", () => {
    const ids = schedule.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("references only known speakers", () => {
    for (const session of schedule) {
      for (const id of session.speakerIds) {
        expect(speakerIds.has(id), `${session.id} references missing speaker ${id}`).toBe(true);
      }
    }
  });

  it("has at least six sessions per day", () => {
    for (const day of [1, 2, 3] as const) {
      expect(sessionsForDay(day).length, `day ${day} session count`).toBeGreaterThanOrEqual(6);
    }
  });
});

describe("DAY_DATES", () => {
  it("anchors the three conference dates", () => {
    expect(DAY_DATES[1]).toBe("2026-05-14");
    expect(DAY_DATES[2]).toBe("2026-05-15");
    expect(DAY_DATES[3]).toBe("2026-05-16");
  });
});

describe("formatDayDate", () => {
  it("formats day 1 in english", () => {
    expect(formatDayDate(1, "en")).toBe("May 14");
  });

  it("formats day 2 in ukrainian", () => {
    expect(formatDayDate(2, "uk")).toBe("15 травня");
  });

  it("formats day 3 in english", () => {
    expect(formatDayDate(3, "en")).toBe("May 16");
  });
});
