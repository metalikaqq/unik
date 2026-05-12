import { z } from "zod";

export const CFP_TRACKS = ["design", "engineering", "community"] as const;
export type CfpTrack = (typeof CFP_TRACKS)[number];

export const CFP_ABSTRACT_MIN = 50;
export const CFP_ABSTRACT_MAX = 1000;

export const cfpSchema = z.object({
  name: z
    .string()
    .transform((value) => value.trim())
    .pipe(z.string().min(1, "errors.name.required")),
  email: z
    .string()
    .min(1, "errors.email.required")
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "errors.email.invalid"),
  title: z
    .string()
    .transform((value) => value.trim())
    .pipe(z.string().min(1, "errors.title.required")),
  abstract: z
    .string()
    .min(CFP_ABSTRACT_MIN, "errors.abstract.min")
    .max(CFP_ABSTRACT_MAX, "errors.abstract.max"),
  track: z.enum(CFP_TRACKS, { message: "errors.track.required" }),
});

export type CfpValues = z.infer<typeof cfpSchema>;
