import { describe, expect, it } from "vitest";

import { TRANSPORT_MODES, venue, venueSchema } from "@/content/venue";

describe("venueSchema", () => {
  it("validates the canonical venue data", () => {
    expect(venueSchema.safeParse(venue).success).toBe(true);
  });

  it("rejects a venue with the wrong number of photos", () => {
    const broken = { ...venue, photos: venue.photos.slice(0, 5) };
    expect(venueSchema.safeParse(broken).success).toBe(false);
  });

  it("rejects an invalid Google Maps URL", () => {
    const broken = { ...venue, mapsUrl: "not-a-url" };
    expect(venueSchema.safeParse(broken).success).toBe(false);
  });
});

describe("venue data", () => {
  it("has six photo entries (per US-007)", () => {
    expect(venue.photos.length).toBe(6);
  });

  it("covers all three transport modes", () => {
    const modes = new Set(venue.gettingThere.map((t) => t.mode));
    expect(modes).toEqual(new Set(TRANSPORT_MODES));
  });

  it("uses explicit width and height for every photo (no CLS)", () => {
    for (const photo of venue.photos) {
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
    }
  });

  it("provides a non-empty list of amenities", () => {
    expect(venue.amenities.length).toBeGreaterThanOrEqual(1);
  });
});
